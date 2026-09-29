'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageSection } from '@/types';
import styles from './Footer.module.css';

interface Props {
  section: PageSection;
  animationEnabled?: boolean;
  defaultDuration?: string;
}

export default function DynamicFooter({ section, animationEnabled = true, defaultDuration = '0.6s' }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const content = section.content || {};

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

  return (
    <footer
      ref={ref}
      className={`${styles.footer} ${visible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ opacity: visible || !animationEnabled ? 1 : 0 }}
    >
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>{content.brand || 'UNIQUE ENTERPRISES'}</span>
            <p className={styles.tagline}>{content.tagline || 'Industrial Cooling Solutions'}</p>
          </div>
          <div className={styles.links}>
            <a href="#about">{content.link1 || 'About'}</a>
            <a href="#products">{content.link2 || 'Products'}</a>
            <a href="#strength">{content.link3 || 'Strength'}</a>
            <a href="#contact">{content.link4 || 'Contact'}</a>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {content.copyright || 'Unique Enterprises. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
}
