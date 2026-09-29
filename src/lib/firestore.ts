import { db, isFirebaseConfigured } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { SiteSettings, PageSection, Product, MediaFile } from '@/types';

// Fallback default settings (used when Firebase is not configured)
export const defaultSettings: SiteSettings = {
  id: 'site',
  colors: {
    primary: '#5B8A9A',
    secondary: '#0D0D0D',
    accent: '#C17F59',
    background: '#0D0D0D',
    text: '#E8E6E3',
    textSecondary: '#8A8A8A',
  },
  fonts: {
    heading: 'Bebas Neue',
    body: 'Inter',
  },
  layout: {
    maxWidth: '1400px',
    containerPadding: '20px',
  },
  animations: {
    enabled: true,
    defaultDuration: '0.6s',
    defaultDelay: '0.1s',
  },
};

export const defaultSections: PageSection[] = [
  { id: 'hero-default', type: 'hero', order: 0, visible: true, content: {}, styles: {}, animation: 'fade-in' },
  { id: 'about-default', type: 'about', order: 1, visible: true, content: {}, styles: {}, animation: 'slide-up' },
  { id: 'products-default', type: 'products', order: 2, visible: true, content: {}, styles: {}, animation: 'fade-in' },
  { id: 'strength-default', type: 'strength', order: 3, visible: true, content: {}, styles: {}, animation: 'slide-up' },
  { id: 'contact-default', type: 'contact', order: 4, visible: true, content: {}, styles: {}, animation: 'fade-in' },
  { id: 'footer-default', type: 'footer', order: 5, visible: true, content: {}, styles: {}, animation: 'fade-in' },
];

export const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'COOLMAX Industrial Pro 5000',
    description: 'Heavy-duty industrial air cooler designed for large factory floors and warehouses. Features triple-layer honeycomb cooling pads with nano-gel coating.',
    specifications: '5000 CFM | 120x80x180 cm | Factories, Steel Mills',
    features: ['IP55 Certified', 'Triple-Layer Cooling', '24/7 Operation', 'Low Power Draw'],
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
    images: [],
    available: true,
    featured: true,
    category: 'Industrial',
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-2',
    name: 'COOLMAX Portable 2000',
    description: 'Compact portable air cooler perfect for spot cooling in workshops and outdoor environments. Easy to move and install.',
    specifications: '2000 CFM | 60x45x120 cm | Workshops, Outdoor',
    features: ['Portable Design', 'Energy Efficient', 'Easy Installation'],
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop',
    images: [],
    available: true,
    featured: false,
    category: 'Portable',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'prod-3',
    name: 'COOLMAX Tower Max 8000',
    description: 'High-capacity tower air cooler for large commercial spaces. Features advanced airflow design and smart controls.',
    specifications: '8000 CFM | 80x80x220 cm | Commercial, Large Spaces',
    features: ['Smart Controls', 'High Capacity', 'Modular Design', 'Pan-India Service'],
    image: 'https://images.unsplash.com/photo-1631545806609-287ae7eff48d?w=600&h=400&fit=crop',
    images: [],
    available: true,
    featured: true,
    category: 'Commercial',
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helper to get collection references safely
function getCollectionRef(collectionName: string) {
  if (!db) {
    throw new Error(`Firestore not initialized. Cannot access ${collectionName}`);
  }
  return collection(db, collectionName);
}

// Settings
export async function getSettings(): Promise<SiteSettings | null> {
  if (!isFirebaseConfigured || !db) {
    console.log('[Firestore] Using default settings (Firebase not configured)');
    return defaultSettings;
  }

  try {
    const docRef = doc(db, 'settings', 'site');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as SiteSettings : defaultSettings;
  } catch (error) {
    console.error('[Firestore] Error getting settings:', error);
    return defaultSettings;
  }
}

export function subscribeToSettings(callback: (settings: SiteSettings | null) => void): () => void {
  if (!isFirebaseConfigured || !db) {
    console.log('[Firestore] Using default settings (Firebase not configured)');
    setTimeout(() => callback(defaultSettings), 0);
    return () => {};
  }

  try {
    const docRef = doc(db, 'settings', 'site');
    return onSnapshot(docRef, (doc) => {
      callback(doc.exists() ? { id: doc.id, ...doc.data() } as SiteSettings : defaultSettings);
    }, (error) => {
      console.error('[Firestore] Settings subscription error:', error);
      callback(defaultSettings);
    });
  } catch (error) {
    console.error('[Firestore] Error subscribing to settings:', error);
    callback(defaultSettings);
    return () => {};
  }
}

export async function updateSettings(settings: Partial<SiteSettings>): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot update settings - Firebase not configured');
    return;
  }

  try {
    const docRef = doc(db, 'settings', 'site');
    await setDoc(docRef, settings, { merge: true });
  } catch (error) {
    console.error('[Firestore] Error updating settings:', error);
    throw error;
  }
}

// Sections
export async function getSections(): Promise<PageSection[]> {
  if (!isFirebaseConfigured || !db) {
    console.log('[Firestore] Using default sections (Firebase not configured)');
    return defaultSections;
  }

  try {
    const q = query(collection(db, 'sections'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PageSection));
  } catch (error) {
    console.error('[Firestore] Error getting sections:', error);
    return defaultSections;
  }
}

export function subscribeToSections(callback: (sections: PageSection[]) => void): () => void {
  if (!isFirebaseConfigured || !db) {
    console.log('[Firestore] Using default sections (Firebase not configured)');
    setTimeout(() => callback(defaultSections), 0);
    return () => {};
  }

  try {
    const q = query(collection(db, 'sections'), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const sections = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as PageSection));
      callback(sections.length > 0 ? sections : defaultSections);
    }, (error) => {
      console.error('[Firestore] Sections subscription error:', error);
      callback(defaultSections);
    });
  } catch (error) {
    console.error('[Firestore] Error subscribing to sections:', error);
    callback(defaultSections);
    return () => {};
  }
}

export async function updateSection(id: string, data: Partial<PageSection>): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot update section - Firebase not configured');
    return;
  }

  try {
    const docRef = doc(db, 'sections', id);
    await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
  } catch (error) {
    console.error('[Firestore] Error updating section:', error);
    throw error;
  }
}

export async function addSection(data: Omit<PageSection, 'id'>): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot add section - Firebase not configured');
    return `local-${Date.now()}`;
  }

  try {
    const docRef = await addDoc(collection(db, 'sections'), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[Firestore] Error adding section:', error);
    throw error;
  }
}

export async function deleteSection(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot delete section - Firebase not configured');
    return;
  }

  try {
    await deleteDoc(doc(db, 'sections', id));
  } catch (error) {
    console.error('[Firestore] Error deleting section:', error);
    throw error;
  }
}

export async function reorderSections(sectionIds: string[]): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot reorder sections - Firebase not configured');
    return;
  }

  try {
    const database = db;
    const updates = sectionIds.map((id, index) =>
      updateDoc(doc(database, 'sections', id), { order: index })
    );
    await Promise.all(updates);
  } catch (error) {
    console.error('[Firestore] Error reordering sections:', error);
    throw error;
  }
}

// Products
export async function getProducts(): Promise<Product[]> {
  if (!isFirebaseConfigured || !db) {
    console.log('[Firestore] Using default products (Firebase not configured)');
    return defaultProducts;
  }

  try {
    const q = query(collection(db, 'products'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  } catch (error) {
    console.error('[Firestore] Error getting products:', error);
    return defaultProducts;
  }
}

export function subscribeToProducts(callback: (products: Product[]) => void): () => void {
  if (!isFirebaseConfigured || !db) {
    console.log('[Firestore] Using default products (Firebase not configured)');
    setTimeout(() => callback(defaultProducts), 0);
    return () => {};
  }

  try {
    const q = query(collection(db, 'products'), orderBy('order', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
      callback(products.length > 0 ? products : defaultProducts);
    }, (error) => {
      console.error('[Firestore] Products subscription error:', error);
      callback(defaultProducts);
    });
  } catch (error) {
    console.error('[Firestore] Error subscribing to products:', error);
    callback(defaultProducts);
    return () => {};
  }
}

export async function addProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot add product - Firebase not configured');
    return `local-${Date.now()}`;
  }

  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...data,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[Firestore] Error adding product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot update product - Firebase not configured');
    return;
  }

  try {
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
  } catch (error) {
    console.error('[Firestore] Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot delete product - Firebase not configured');
    return;
  }

  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('[Firestore] Error deleting product:', error);
    throw error;
  }
}

// Media
export async function getMedia(): Promise<MediaFile[]> {
  if (!isFirebaseConfigured || !db) {
    return [];
  }

  try {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MediaFile));
  } catch (error) {
    console.error('[Firestore] Error getting media:', error);
    return [];
  }
}

export function subscribeToMedia(callback: (media: MediaFile[]) => void): () => void {
  if (!isFirebaseConfigured || !db) {
    setTimeout(() => callback([]), 0);
    return () => {};
  }

  try {
    const q = query(collection(db, 'media'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const media = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MediaFile));
      callback(media);
    }, (error) => {
      console.error('[Firestore] Media subscription error:', error);
      callback([]);
    });
  } catch (error) {
    console.error('[Firestore] Error subscribing to media:', error);
    callback([]);
    return () => {};
  }
}

export async function addMedia(data: Omit<MediaFile, 'id' | 'createdAt'>): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot add media - Firebase not configured');
    return `local-${Date.now()}`;
  }

  try {
    const docRef = await addDoc(collection(db, 'media'), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('[Firestore] Error adding media:', error);
    throw error;
  }
}

export async function deleteMedia(id: string): Promise<void> {
  if (!isFirebaseConfigured || !db) {
    console.warn('[Firestore] Cannot delete media - Firebase not configured');
    return;
  }

  try {
    await deleteDoc(doc(db, 'media', id));
  } catch (error) {
    console.error('[Firestore] Error deleting media:', error);
    throw error;
  }
}
