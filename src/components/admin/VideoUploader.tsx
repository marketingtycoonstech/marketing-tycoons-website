import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';
import { Upload, X, Loader2 } from 'lucide-react';

interface Props {
  onUploadSuccess: (url: string) => void;
  onClose: () => void;
}

export const VideoUploader: React.FC<Props> = ({ onUploadSuccess, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 30 * 1024 * 1024) {
        setError('File size exceeds 30MB limit.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage, `portfolio-videos/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', null, 
        (err) => { setError(err.message); setUploading(false); },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadSuccess(downloadURL);
          setUploading(false);
          onClose();
        }
      );
    } catch (err: any) {
      setError(err.message);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#121319] border border-gray-800 p-6 rounded-2xl w-full max-w-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-bold">Upload Video</h3>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <input type="file" accept="video/*" onChange={handleFileChange} className="text-xs text-gray-300" />
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button 
          onClick={handleUpload} 
          disabled={!file || uploading}
          className="w-full py-2 bg-[#d4af37] rounded-lg text-black font-bold text-xs disabled:opacity-50 flex items-center justify-center"
        >
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upload'}
        </button>
      </div>
    </div>
  );
};
