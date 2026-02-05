import { Image } from '../store/images.store';

const STORAGE_KEY = 'xm_images';

function readStorage(): Image[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    console.warn('localStorage read failed');
    return [];
  }
}

function writeStorage(items: Image[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    console.warn('localStorage write failed');
  }
}

export const localStorageService = {
  saveImage: (image: Image): void => {
    const items = readStorage();
    const exists = items.some((i) => i.id === image.id);
    if (exists) return;
    items.push(image);
    writeStorage(items);
  },

  loadImages: (): Image[] => {
    return readStorage();
  },

  removeImage: (id: string): void => {
    const items = readStorage();
    const filtered = items.filter((i) => i.id !== id);
    if (filtered.length !== items.length) writeStorage(filtered);
  },
};

export default localStorageService;
