'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageSection } from '@/types';
import { useCMS } from '@/context/CMSContext';
import styles from './Hero.module.css';

interface Props {
  section: PageSection;
  animationEnabled?: boolean;
  defaultDuration?: string;
}

export default function DynamicHero({ section, animationEnabled = true, defaultDuration = '0.6s' }: Props) {
  const { media } = useCMS();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const content = section.content || {};
  const animationClass = animationEnabled && section.animation
    ? `animate-${section.animation.replace('-', '-')}`
    : '';

  const imageUrl = content.image || 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=700&fit=crop';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.hero} ${visible ? animationClass : 'opacity-0'}`}
      style={{
        animationDuration: section.styles?.duration || defaultDuration,
        opacity: visible || !animationEnabled ? 1 : 0,
      }}
    >
      <div className={styles.bgPattern}></div>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeLine}></span>
            <span className={styles.badgeText}>{content.badge || 'Premium Quality Since 2010'}</span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>{content.line1 || 'Heavy Duty'}</span>
            <span className={`${styles.titleLine} ${styles.accent}`}>{content.line2 || 'Industrial'}</span>
            <span className={styles.titleLine}>{content.line3 || 'Air Coolers'}</span>
          </h1>
          <p className={styles.subtitle}>{content.subtitle || 'Engineered for extreme conditions. Built for industries that demand reliable cooling under pressure.'}</p>
          <div className={styles.cta}>
            <a href="#products" className="btn btn-primary">
              {content.cta1 || 'View Products'}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary">
              {content.cta2 || 'Get Quote'}
            </a>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.imageContainer}>
            <div className={styles.imageFrame}>
              <img src={imageUrl} alt="Industrial Air Cooler" className={styles.image} />
              <div className={styles.imageOverlay}></div>
            </div>
            <div className={styles.specsFloat}>
              <div className={styles.specItem}>
                <span className={styles.specValue}>{content.stat0Value || '50+'}</span>
                <span className={styles.specLabel}>{content.stat0Label || 'Models'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specValue}>{content.stat1Value || '15k+'}</span>
                <span className={styles.specLabel}>{content.stat1Label || 'Deployed'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>{content.scrollText || 'Scroll'}</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
