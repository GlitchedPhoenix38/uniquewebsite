import { FirebaseApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { Auth } from 'firebase/auth';

export interface SiteSettings {
  id: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    textSecondary: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: {
    maxWidth: string;
    containerPadding: string;
  };
  animations: {
    enabled: boolean;
    defaultDuration: string;
    defaultDelay: string;
  };
  logo?: string;
  favicon?: string;
}

export interface PageSection {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  content: Record<string, string>;
  styles: Record<string, string>;
  animation?: AnimationType;
  image?: MediaFile;
}

export type SectionType = 
  | 'hero'
  | 'about'
  | 'products'
  | 'strength'
  | 'contact'
  | 'features'
  | 'testimonials'
  | 'cta'
  | 'footer';

export type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-out' | 'bounce';

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: string;
  specifications: string;
  features: string[];
  image: string;
  images: string[];
  video?: string;
  available: boolean;
  featured: boolean;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  path: string;
  type: 'image' | 'video' | 'document';
  size: number;
  createdAt: Date;
  filters?: {
    brightness?: number;
    contrast?: number;
    saturation?: number;
  };
}

export interface ContentBlock {
  id: string;
  pageId: string;
  sectionId: string;
  type: 'text' | 'image' | 'video' | 'button' | 'icon';
  content: string;
  styles: Record<string, string>;
  order: number;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor';
  createdAt: Date;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
