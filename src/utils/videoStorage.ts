// High-performance IndexedDB Video Storage Engine for Marketing Tycoons Admin Portal
// Supports videos up to 35MB+ stored directly in the browser's persistent IndexedDB

const DB_NAME = 'mt_media_vault_db';
const DB_VERSION = 1;
const STORE_NAME = 'uploaded_videos';

export interface StoredVideoItem {
  id: string;
  name: string;
  size: number;
  sizeFormatted: string;
  type: string;
  duration?: number;
  durationFormatted?: string;
  posterDataUrl?: string;
  targetSlot: 'film_main' | 'film_fullwidth' | 'film_hero' | 'general';
  uploadedAt: string;
  blob?: Blob;
  objectUrl?: string;
}

// Open or initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Format bytes helper
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// Format seconds to mm:ss
export function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Extract video metadata (duration & first-frame canvas poster)
export function extractVideoMeta(file: File | Blob): Promise<{ duration: number; poster: string }> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const tempUrl = URL.createObjectURL(file);
    video.src = tempUrl;

    video.onloadedmetadata = () => {
      // Seek to 1s or 25% duration to avoid black frame
      const targetTime = Math.min(1.0, video.duration / 2);
      video.currentTime = targetTime;
    };

    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = Math.min(video.videoWidth || 640, 640);
        canvas.height = Math.min(video.videoHeight || 360, 360);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const poster = canvas.toDataURL('image/jpeg', 0.85);
          URL.revokeObjectURL(tempUrl);
          resolve({ duration: video.duration || 0, poster });
          return;
        }
      } catch (err) {
        console.warn('Could not extract canvas poster frame:', err);
      }
      URL.revokeObjectURL(tempUrl);
      resolve({ duration: video.duration || 0, poster: '' });
    };

    video.onerror = () => {
      URL.revokeObjectURL(tempUrl);
      resolve({ duration: 0, poster: '' });
    };
  });
}

// In-memory ObjectURL cache
const objectUrlCache = new Map<string, string>();

// Save video into IndexedDB
export async function saveVideoToVault(
  id: string,
  file: File | Blob,
  targetSlot: 'film_main' | 'film_fullwidth' | 'film_hero' | 'general' = 'film_main',
  customName?: string
): Promise<StoredVideoItem> {
  const db = await openDB();
  const meta = await extractVideoMeta(file);

  const fileName = customName || (file instanceof File ? file.name : `video-${Date.now()}.mp4`);
  const item: StoredVideoItem = {
    id,
    name: fileName,
    size: file.size,
    sizeFormatted: formatBytes(file.size),
    type: file.type || 'video/mp4',
    duration: meta.duration,
    durationFormatted: formatDuration(meta.duration),
    posterDataUrl: meta.poster,
    targetSlot,
    uploadedAt: new Date().toISOString()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Store record including raw blob
    const record = { ...item, blob: file };
    const req = store.put(record);

    req.onsuccess = () => {
      // Create and cache ObjectURL
      const objUrl = URL.createObjectURL(file);
      objectUrlCache.set(id, objUrl);
      resolve({ ...item, objectUrl: objUrl });
    };

    req.onerror = () => reject(req.error);
  });
}

// Retrieve video ObjectURL from vault
export async function getVideoFromVault(id: string): Promise<{ item: StoredVideoItem | null; objectUrl: string | null }> {
  // Check cached object URL
  if (objectUrlCache.has(id)) {
    return { item: null, objectUrl: objectUrlCache.get(id) || null };
  }

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);

      req.onsuccess = () => {
        const data = req.result;
        if (data && data.blob) {
          const objUrl = URL.createObjectURL(data.blob);
          objectUrlCache.set(id, objUrl);
          const { blob, ...itemWithoutBlob } = data;
          resolve({ item: itemWithoutBlob, objectUrl: objUrl });
        } else {
          resolve({ item: null, objectUrl: null });
        }
      };

      req.onerror = () => resolve({ item: null, objectUrl: null });
    });
  } catch {
    return { item: null, objectUrl: null };
  }
}

// Get all uploaded videos metadata (without loading large blobs into memory)
export async function getAllVaultVideos(): Promise<StoredVideoItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const records = (req.result || []).map((r: any) => {
          const { blob, ...item } = r;
          if (objectUrlCache.has(item.id)) {
            item.objectUrl = objectUrlCache.get(item.id);
          }
          return item;
        });
        resolve(records);
      };

      req.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

// Delete video from vault
export async function deleteVideoFromVault(id: string): Promise<boolean> {
  try {
    const db = await openDB();
    if (objectUrlCache.has(id)) {
      URL.revokeObjectURL(objectUrlCache.get(id)!);
      objectUrlCache.delete(id);
    }
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
}

// Helper hook or resolver to get playable URL from any stored video string
export async function resolveVideoUrl(storedUrl?: string): Promise<string> {
  if (!storedUrl) return '/marketing_tycoons_brand_film.mp4';
  if (storedUrl.startsWith('vault:')) {
    const id = storedUrl.replace('vault:', '');
    const { objectUrl } = await getVideoFromVault(id);
    return objectUrl || '/marketing_tycoons_brand_film.mp4';
  }
  return storedUrl;
}
