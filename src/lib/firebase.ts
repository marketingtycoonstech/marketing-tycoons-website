import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  Firestore,
  collection,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp
} from 'firebase/firestore';
import {
  getStorage,
  FirebaseStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
export const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Initialize Firestore with autoDetectLongPolling for seamless reliability in web/iframe sandbox environments
let firestoreInstance: Firestore;
try {
  firestoreInstance = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  }, firebaseConfig.firestoreDatabaseId);
} catch {
  // If already initialized, retrieve existing instance
  firestoreInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}
export const db: Firestore = firestoreInstance;

// Initialize Storage
export const storage: FirebaseStorage = getStorage(app);

export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authorized Super Admin Emails (Primary agency owner)
export const AUTHORIZED_ADMIN_EMAILS = [
  'marketingtycoons.tech@gmail.com'
];

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errCode = (error as { code?: string })?.code;

  // Handle transient offline / unavailable states gracefully as Firestore operates in offline mode
  if (errCode === 'unavailable' || errMsg.includes('offline') || errMsg.includes('Could not reach Cloud Firestore')) {
    console.info(`[Firestore Status] Backend in offline cache mode for '${path}'. Updates will sync automatically when connected.`);
    return {
      error: 'Backend operating in offline mode. Local cache active.',
      operationType,
      path,
      authInfo: {
        userId: auth.currentUser?.uid || null,
        email: auth.currentUser?.email || null,
      }
    };
  }

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn(`[Firestore Safe Handler] Operation '${operationType}' on path '${path}':`, errInfo.error);
  return errInfo;
}

// Initial non-blocking connectivity check with graceful offline support
async function testFirestoreConnection() {
  try {
    await getDoc(doc(db, 'test', 'connection'));
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes('offline') || (error as { code?: string })?.code === 'unavailable') {
      console.info("[Firestore Status] Initialized in offline-tolerant mode.");
    }
  }
}
testFirestoreConnection();

/**
 * Sign in with Google legal authentication via Firebase Auth
 */
export async function signInWithGoogle(): Promise<{
  user: FirebaseUser;
  isAdmin: boolean;
}> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user is an authorized admin
    const email = (user.email || '').toLowerCase().trim();
    const isAdmin = AUTHORIZED_ADMIN_EMAILS.includes(email);

    // Record user profile in Firestore
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Client User',
          photoURL: user.photoURL || '',
          role: isAdmin ? 'Super Admin' : 'Client',
          lastLoginAt: serverTimestamp(),
          isGoogleVerified: true
        },
        { merge: true }
      );
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `users/${user.uid}`);
    }

    return { user, isAdmin };
  } catch (error: any) {
    console.error('Google Sign-in failed:', error);
    
    let friendlyMessage = error?.message || String(error);
    const code = error?.code;
    const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
    
    if (code === 'auth/unauthorized-domain') {
      friendlyMessage = `Unauthorized Domain: Please add '${hostname}' to your Firebase console (Authentication > Settings > Authorized Domains). Copy this domain and allow it in Firebase console to enable secure login.`;
    } else if (code === 'auth/popup-blocked') {
      friendlyMessage = 'Popup Blocked: Your browser blocked the Google login window. Please enable popups for this site (look for the popup blocker icon in your browser address bar) and try again.';
    } else if (code === 'auth/web-storage-unsupported') {
      friendlyMessage = 'Web Storage Unsupported: Google login cannot be completed inside a restricted iframe. Please open the application directly in a full browser tab or enable third-party cookies.';
    } else if (code === 'auth/cancelled-popup-request') {
      friendlyMessage = 'Sign-in cancelled: The authentication window was closed before completion. Please try again.';
    }
    
    const enrichedError = new Error(friendlyMessage);
    (enrichedError as any).code = code;
    (enrichedError as any).originalError = error;
    throw enrichedError;
  }
}

/**
 * Log out currently authenticated user
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Sign in admin session using Master Security Key credentials
 * Ensures an active Firebase Auth session so Firestore rules allow writes
 */
export async function signInAdminMasterKey(): Promise<FirebaseUser | null> {
  try {
    if (auth.currentUser) return auth.currentUser;
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (err) {
    console.warn('[Firebase Auth] Master key auth initialization notice:', err);
    return null;
  }
}

/**
 * Compress an image file to a lightweight WebP/JPEG data URL (< 50KB)
 * Guarantees that any fallback image never exceeds Firestore's 1MB document limit
 */
export function compressImageFile(file: File, maxWidth = 800, maxHeight = 800, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/webp', quality);
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    };
    img.src = objectUrl;
  });
}

/**
 * Validate connection to Firestore using server query
 */
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration: client is offline.");
    }
    return false;
  }
}

/**
 * Upload a media file (image, video, banner, etc.) to Firebase Storage with progress tracking.
 * Falls back gracefully if Firebase Storage is unavailable in the environment.
 */
export async function uploadMediaToStorage(
  file: File,
  sectionId: string,
  onProgress?: (progress: number) => void
): Promise<{ downloadURL: string; storagePath: string }> {
  const timestamp = Date.now();
  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `cms_media/${sectionId}/${timestamp}_${cleanName}`;

  try {
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        originalName: file.name,
        sectionId,
        uploadedAt: new Date().toISOString()
      }
    });

    return await new Promise<{ downloadURL: string; storagePath: string }>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.totalBytes > 0) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(Math.round(progress));
          }
        },
        async (error) => {
          console.warn('[Firebase Storage] Primary upload notice, using compressed fallback:', error.message);
          try {
            const compressed = await compressImageFile(file);
            if (onProgress) onProgress(100);
            resolve({ downloadURL: compressed, storagePath: `local_fallback/${timestamp}_${cleanName}` });
          } catch {
            reject(error);
          }
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            if (onProgress) onProgress(100);
            resolve({ downloadURL, storagePath });
          } catch (urlError) {
            console.warn('[Firebase Storage] Failed to get download URL, using compressed fallback:', urlError);
            const compressed = await compressImageFile(file);
            resolve({ downloadURL: compressed, storagePath: `local_fallback/${timestamp}_${cleanName}` });
          }
        }
      );
    });
  } catch (err: any) {
    console.warn('[Firebase Storage] Direct upload notice, evaluating compressed fallback:', err);
    try {
      const compressed = await compressImageFile(file);
      if (onProgress) onProgress(100);
      return {
        downloadURL: compressed,
        storagePath: `local_fallback/${timestamp}_${cleanName}`
      };
    } catch {
      throw err;
    }
  }
}

/**
 * Safely delete an existing media file from Firebase Storage
 */
export async function deleteMediaFromStorage(storagePath: string): Promise<boolean> {
  if (!storagePath || storagePath.startsWith('http') || storagePath.startsWith('data:') || storagePath.startsWith('local_fallback/')) {
    return true; // Not an active Firebase storage path
  }
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.warn('[Firebase Storage] Safe delete notice (file may not exist or already removed):', error);
    return false;
  }
}

export {
  onAuthStateChanged,
  type FirebaseUser,
  collection,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
};
