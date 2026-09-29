'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageSection } from '@/types';
import styles from './Strength.module.css';

interface Props {
  section: PageSection;
  animationEnabled?: boolean;
  defaultDuration?: string;
}

const defaultStrengths = [
  { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', title: 'Triple-Layer Cooling', desc: 'Proprietary honeycomb pads with nano-gel coating provide 40% more cooling efficiency than conventional systems.' },
  { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4', title: 'IP55 Certified', desc: 'Dust-tight and protected against water jets. Operates flawlessly in dusty foundries and humid chemical plants.' },
  { icon: 'M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: '24/7 Operation', desc: 'Industrial-grade motors rated for continuous operation. Built to run 8,760 hours a year without compromise.' },
  { icon: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z', title: 'Modular Design', desc: 'Every component is field-replaceable. No special tools required. Minimum downtime, maximum reliability.' },
  { icon: 'M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83', title: 'Low Power Draw', desc: 'Advanced motor technology reduces energy consumption by 35% compared to traditional industrial coolers.' },
  { icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', title: 'Pan-India Service', desc: '200+ service touchpoints. Same-day spare availability in metro cities. 48-hour response guarantee.' },
];

export default function DynamicStrength({ section, animationEnabled = true, defaultDuration = '0.6s' }: Props) {
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

  const strengths = defaultStrengths.map((s, i) => ({
    ...s,
    title: content[`card${i}Title`] || s.title,
    desc: content[`card${i}Desc`] || s.desc,
  }));

  return (
    <section
      ref={ref}
      id="strength"
      className={`section ${styles.strength} ${visible ? animationClass : 'opacity-0'}`}
      style={{
        animationDuration: section.styles?.duration || defaultDuration,
        opacity: visible || !animationEnabled ? 1 : 0,
      }}
    >
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{content.label || '03 — Why Us'}</span>
          <h2 className="section-title">{content.title || 'Engineered for Excellence'}</h2>
        </div>
        <div className={styles.grid}>
          {strengths.map((item, index) => (
            <div key={index} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={styles.icon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d={item.icon} />
                </svg>
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
