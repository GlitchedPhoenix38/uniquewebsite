'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { SiteSettings, PageSection, Product, MediaFile, Toast } from '@/types';
import {
  subscribeToSettings,
  subscribeToSections,
  subscribeToProducts,
  subscribeToMedia,
  updateSettings as saveSettings,
  updateSection,
  addSection,
  deleteSection,
  reorderSections,
  updateProduct,
  addProduct,
  deleteProduct,
  updateSettings,
  addMedia,
  deleteMedia as removeMedia,
  defaultSettings,
  defaultSections,
  defaultProducts,
} from '@/lib/firestore';
import { isFirebaseConfigured } from '@/lib/firebase';

interface CMSContextType {
  settings: SiteSettings;
  sections: PageSection[];
  products: Product[];
  media: MediaFile[];
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  toasts: Toast[];
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  updateSectionContent: (sectionId: string, content: Record<string, string>) => Promise<void>;
  updateSectionStyle: (sectionId: string, styles: Record<string, string>) => Promise<void>;
  updateSectionAnimation: (sectionId: string, animation: string) => Promise<void>;
  toggleSectionVisibility: (sectionId: string, visible: boolean) => Promise<void>;
  createSection: (type: PageSection['type']) => Promise<void>;
  removeSection: (sectionId: string) => Promise<void>;
  reorder: (sectionIds: string[]) => Promise<void>;
  updateProductData: (productId: string, data: Partial<Product>) => Promise<void>;
  createProduct: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  uploadMedia: (file: File) => Promise<string>;
  removeMediaFile: (mediaId: string, url: string) => Promise<void>;
  showToast: (message: string, type?: Toast['type']) => void;
  retry: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [sections, setSections] = useState<PageSection[]>(defaultSections);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo] = useState(!isFirebaseConfigured);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const mountedRef = useRef(true);
  const retryCountRef = useRef(0);

  useEffect(() => {
    mountedRef.current = true;
    
    const initCMS = async () => {
      console.log('[CMS] Initializing...');
      setLoading(true);
      setError(null);
      retryCountRef.current += 1;

      // Timeout fallback - if loading takes too long, show error state
      const timeoutId = setTimeout(() => {
        if (mountedRef.current && retryCountRef.current <= 3) {
          console.warn('[CMS] Loading timeout - using fallback data');
          setSettings(defaultSettings);
          setSections(defaultSections);
          setProducts(defaultProducts);
          setLoading(false);
          setError('Firebase connection timed out. Using demo data.');
        }
      }, 5000);

      try {
        // Subscribe to all data sources
        console.log('[CMS] Subscribing to Firebase...');
        
        const unsubSettings = subscribeToSettings((data) => {
          if (mountedRef.current && data) {
            console.log('[CMS] Settings loaded:', data.id);
            setSettings(data);
          }
        });

        const unsubSections = subscribeToSections((data) => {
          if (mountedRef.current && data) {
            console.log('[CMS] Sections loaded:', data.length, 'items');
            setSections(data);
          }
        });

        const unsubProducts = subscribeToProducts((data) => {
          if (mountedRef.current && data) {
            console.log('[CMS] Products loaded:', data.length, 'items');
            setProducts(data);
            setLoading(false);
          }
        });

        const unsubMedia = subscribeToMedia((data) => {
          if (mountedRef.current) {
            console.log('[CMS] Media loaded:', data.length, 'items');
            setMedia(data);
          }
        });

        // After a reasonable time, force loading to false if Firebase never responded
        setTimeout(() => {
          if (mountedRef.current && retryCountRef.current === 1) {
            clearTimeout(timeoutId);
            setLoading(false);
            if (!isFirebaseConfigured) {
              setError('Firebase not configured. Using demo mode.');
              console.log('[CMS] Running in demo mode with fallback data');
            }
          }
        }, 3000);

        return () => {
          clearTimeout(timeoutId);
          unsubSettings();
          unsubSections();
          unsubProducts();
          unsubMedia();
        };
      } catch (err) {
        clearTimeout(timeoutId);
        if (mountedRef.current) {
          console.error('[CMS] Initialization error:', err);
          setError('Failed to connect to Firebase. Using demo data.');
          setSettings(defaultSettings);
          setSections(defaultSections);
          setProducts(defaultProducts);
          setLoading(false);
        }
      }
    };

    const unsubscribe = initCMS();

    return () => {
      mountedRef.current = false;
      unsubscribe?.then(unsub => unsub?.());
    };
  }, []);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const retry = useCallback(() => {
    retryCountRef.current = 0;
    setLoading(true);
    setError(null);
    window.location.reload();
  }, []);

  const updateSiteSettings = useCallback(async (newSettings: Partial<SiteSettings>) => {
    try {
      await saveSettings({ ...settings, ...newSettings } as SiteSettings);
      showToast('Settings updated successfully', 'success');
    } catch (err) {
      console.error('[CMS] Error updating settings:', err);
      showToast('Failed to update settings', 'error');
    }
  }, [settings, showToast]);

  const updateSectionContent = useCallback(async (sectionId: string, content: Record<string, string>) => {
    try {
      await updateSection(sectionId, { content: { ...sections.find(s => s.id === sectionId)?.content, ...content } });
    } catch (err) {
      console.error('[CMS] Error updating section content:', err);
      showToast('Failed to update section', 'error');
    }
  }, [sections, showToast]);

  const updateSectionStyle = useCallback(async (sectionId: string, styles: Record<string, string>) => {
    try {
      await updateSection(sectionId, { styles: { ...sections.find(s => s.id === sectionId)?.styles, ...styles } });
    } catch (err) {
      console.error('[CMS] Error updating section styles:', err);
      showToast('Failed to update styles', 'error');
    }
  }, [sections, showToast]);

  const updateSectionAnimation = useCallback(async (sectionId: string, animation: string) => {
    try {
      await updateSection(sectionId, { animation: animation as PageSection['animation'] });
    } catch (err) {
      console.error('[CMS] Error updating animation:', err);
      showToast('Failed to update animation', 'error');
    }
  }, [showToast]);

  const toggleSectionVisibility = useCallback(async (sectionId: string, visible: boolean) => {
    try {
      await updateSection(sectionId, { visible });
      showToast(visible ? 'Section visible' : 'Section hidden', 'success');
    } catch (err) {
      console.error('[CMS] Error toggling visibility:', err);
      showToast('Failed to toggle visibility', 'error');
    }
  }, [showToast]);

  const createSection = useCallback(async (type: PageSection['type']) => {
    try {
      const maxOrder = Math.max(0, ...sections.map(s => s.order));
      await addSection({ type, order: maxOrder + 1, visible: true, content: {}, styles: {}, animation: 'fade-in' });
      showToast('Section added', 'success');
    } catch (err) {
      console.error('[CMS] Error creating section:', err);
      showToast('Failed to add section', 'error');
    }
  }, [sections, showToast]);

  const removeSection = useCallback(async (sectionId: string) => {
    try {
      await deleteSection(sectionId);
      showToast('Section removed', 'success');
    } catch (err) {
      console.error('[CMS] Error removing section:', err);
      showToast('Failed to remove section', 'error');
    }
  }, [showToast]);

  const reorder = useCallback(async (sectionIds: string[]) => {
    try {
      await reorderSections(sectionIds);
    } catch (err) {
      console.error('[CMS] Error reordering sections:', err);
      showToast('Failed to reorder sections', 'error');
    }
  }, [showToast]);

  const updateProductData = useCallback(async (productId: string, data: Partial<Product>) => {
    try {
      await updateProduct(productId, data);
      showToast('Product updated', 'success');
    } catch (err) {
      console.error('[CMS] Error updating product:', err);
      showToast('Failed to update product', 'error');
    }
  }, [showToast]);

  const createProduct = useCallback(async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await addProduct(data);
      showToast('Product created', 'success');
    } catch (err) {
      console.error('[CMS] Error creating product:', err);
      showToast('Failed to create product', 'error');
    }
  }, [showToast]);

  const removeProduct = useCallback(async (productId: string) => {
    try {
      await deleteProduct(productId);
      showToast('Product deleted', 'success');
    } catch (err) {
      console.error('[CMS] Error deleting product:', err);
      showToast('Failed to delete product', 'error');
    }
  }, [showToast]);

  const uploadMedia = useCallback(async (file: File): Promise<string> => {
    try {
      const { uploadFile } = await import('@/lib/storage');
      const url = await uploadFile(file, 'media');
      await addMedia({ name: file.name, url, path: `media/${file.name}`, type: 'image', size: file.size });
      showToast('File uploaded', 'success');
      return url;
    } catch (err) {
      console.error('[CMS] Error uploading media:', err);
      showToast('Failed to upload file', 'error');
      throw err;
    }
  }, [showToast]);

  const removeMediaFile = useCallback(async (mediaId: string, url: string) => {
    try {
      await removeMedia(mediaId);
      const { deleteFile } = await import('@/lib/storage');
      await deleteFile(url);
      showToast('File deleted', 'success');
    } catch (err) {
      console.error('[CMS] Error deleting media:', err);
      showToast('Failed to delete file', 'error');
    }
  }, [showToast]);

  return (
    <CMSContext.Provider
      value={{
        settings,
        sections,
        products,
        media,
        loading,
        error,
        isDemo,
        toasts,
        updateSiteSettings,
        updateSectionContent,
        updateSectionStyle,
        updateSectionAnimation,
        toggleSectionVisibility,
        createSection,
        removeSection,
        reorder,
        updateProductData,
        createProduct,
        removeProduct,
        uploadMedia,
        removeMediaFile,
        showToast,
        retry,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
