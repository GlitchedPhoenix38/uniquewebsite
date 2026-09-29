'use client';

import React from 'react';
import { useCMS } from '@/context/CMSContext';
import DynamicHero from '@/components/dynamic/Hero';
import DynamicAbout from '@/components/dynamic/About';
import DynamicProducts from '@/components/dynamic/Products';
import DynamicStrength from '@/components/dynamic/Strength';
import DynamicContact from '@/components/dynamic/Contact';
import DynamicFooter from '@/components/dynamic/Footer';
import styles from './page.module.css';

export default function HomePage() {
  const { settings, sections, loading, error, isDemo, retry } = useCMS();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading website...</p>
        {isDemo && <span className={styles.demoBadge}>Demo Mode</span>}
      </div>
    );
  }

  if (error && sections.length === 0) {
    return (
      <div className={styles.error}>
        <div className={styles.errorContent}>
          <h1>Oops! Something went wrong</h1>
          <p>{error}</p>
          <div className={styles.errorActions}>
            <button onClick={retry} className={styles.retryBtn}>
              Try Again
            </button>
          </div>
          {isDemo && (
            <p className={styles.demoNote}>
              Note: Firebase is not configured. The app is running in demo mode.
              Configure your Firebase environment variables to enable full functionality.
            </p>
          )}
        </div>
      </div>
    );
  }

  const sectionComponents: Record<string, React.ComponentType<any>> = {
    hero: DynamicHero,
    about: DynamicAbout,
    products: DynamicProducts,
    strength: DynamicStrength,
    contact: DynamicContact,
    footer: DynamicFooter,
  };

  const visibleSections = sections.filter((s) => s.visible).sort((a, b) => a.order - b.order);

  if (visibleSections.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Welcome to Unique Enterprises</h1>
        <p>Content is unavailable right now.</p>
      </div>
    );
  }

  return (
    <>
      {isDemo && (
        <div className={styles.demoBanner}>
          Demo Mode - Firebase not configured
        </div>
      )}
      <style jsx global>{`
        :root {
          --primary: ${settings?.colors?.primary || '#5B8A9A'};
          --secondary: ${settings?.colors?.secondary || '#0D0D0D'};
          --accent: ${settings?.colors?.accent || '#C17F59'};
          --background: ${settings?.colors?.background || '#0D0D0D'};
          --text: ${settings?.colors?.text || '#E8E6E3'};
          --text-secondary: ${settings?.colors?.textSecondary || '#8A8A8A'};
          --font-heading: ${settings?.fonts?.heading || 'Bebas Neue'}, sans-serif;
          --font-body: ${settings?.fonts?.body || 'Inter'}, sans-serif;
          --max-width: ${settings?.layout?.maxWidth || '1400px'};
          --container-padding: ${settings?.layout?.containerPadding || '20px'};
        }
      `}</style>
      
      {visibleSections.map((section) => {
        const Component = sectionComponents[section.type];
        if (!Component) return null;
        return (
          <Component
            key={section.id}
            section={section}
            animationEnabled={settings?.animations?.enabled ?? true}
            defaultDuration={settings?.animations?.defaultDuration || '0.6s'}
          />
        );
      })}
    </>
  );
}
