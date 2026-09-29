'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageSection } from '@/types';
import styles from './About.module.css';

interface Props {
  section: PageSection;
  animationEnabled?: boolean;
  defaultDuration?: string;
}

export default function DynamicAbout({ section, animationEnabled = true, defaultDuration = '0.6s' }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const content = section.content || {};
  const animationClass = animationEnabled && section.animation ? `animate-${section.animation}` : '';

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

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: content.stat0Value || '16', suffix: content.stat0Suffix || '+', label: content.stat0Label || 'Years Experience' },
    { value: content.stat1Value || '50', suffix: content.stat1Suffix || '+', label: content.stat1Label || 'Product Models' },
    { value: content.stat2Value || '15', suffix: content.stat2Suffix || 'k+', label: content.stat2Label || 'Units Deployed' },
    { value: content.stat3Value || '98', suffix: content.stat3Suffix || '%', label: content.stat3Label || 'Client Retention' },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className={`section ${styles.about} ${visible ? animationClass : 'opacity-0'}`}
      style={{
        animationDuration: section.styles?.duration || defaultDuration,
        opacity: visible || !animationEnabled ? 1 : 0,
      }}
    >
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{content.label || '01 — About Us'}</span>
          <h2 className="section-title">{content.title || 'Built to Perform.<br/>Designed to Last.'}</h2>
        </div>
        <div className={styles.content}>
          <div className={styles.text}>
            <p className={styles.lead}>{content.lead || 'We engineer industrial air cooling solutions that operate where others fail—in foundries, steel mills, textile plants, and outdoor environments facing 50°C+ temperatures.'}</p>
            <p className={styles.body}>{content.body || 'Every Unique Enterprises air cooler undergoes rigorous testing in simulated extreme conditions. Our patented honeycomb cooling pads and corrosion-resistant housings are manufactured in-house, ensuring complete quality control from raw materials to finished product.'}</p>
          </div>
          <div className={styles.stats}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statNumber}>{stat.value}</span>
                <span className={styles.statSuffix}>{stat.suffix}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
