import { storage, isFirebaseConfigured } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
  downloadURL?: string;
  error?: string;
}

export function uploadFile(
  file: File,
  folder: string = 'uploads',
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!isFirebaseConfigured || !storage) {
      const error = new Error('Firebase Storage not configured');
      onProgress?.({ progress: 0, bytesTransferred: 0, totalBytes: 0, error: error.message });
      reject(error);
      return;
    }

    try {
      const extension = file.name.split('.').pop();
      const fileName = `${generateId()}.${extension}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.({
            progress,
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
          });
        },
        (error) => {
          console.error('[Storage] Upload error:', error);
          onProgress?.({ progress: 0, bytesTransferred: 0, totalBytes: 0, error: error.message });
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            onProgress?.({
              progress: 100,
              bytesTransferred: file.size,
              totalBytes: file.size,
              downloadURL,
            });
            resolve(downloadURL);
          } catch (err) {
            reject(err);
          }
        }
      );
    } catch (error) {
      console.error('[Storage] Upload setup error:', error);
      reject(error);
    }
  });
}

export async function deleteFile(url: string): Promise<void> {
  if (!isFirebaseConfigured || !storage) {
    console.warn('[Storage] Firebase not configured, skipping delete');
    return;
  }

  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('[Storage] Delete error:', error);
  }
}

export async function listFiles(folder: string = 'uploads'): Promise<string[]> {
  if (!isFirebaseConfigured || !storage) {
    console.warn('[Storage] Firebase not configured, returning empty list');
    return [];
  }

  try {
    const storageRef = ref(storage, folder);
    const result = await listAll(storageRef);
    const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
    return urls;
  } catch (error) {
    console.error('[Storage] List files error:', error);
    return [];
  }
}

export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  return validTypes.includes(file.type);
}

export function isValidVideoType(file: File): boolean {
  const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  return validTypes.includes(file.type);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
