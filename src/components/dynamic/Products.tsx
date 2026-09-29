'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageSection, Product } from '@/types';
import { useCMS } from '@/context/CMSContext';
import styles from './Products.module.css';

interface Props {
  section: PageSection;
  animationEnabled?: boolean;
  defaultDuration?: string;
}

export default function DynamicProducts({ section, animationEnabled = true, defaultDuration = '0.6s' }: Props) {
  const { products } = useCMS();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

  const parseSpecs = (spec: string) => {
    const parts = spec.split('|').map(s => s.trim());
    return { capacity: parts[0] || '', size: parts[1] || '', usage: parts[2] || '' };
  };

  return (
    <section
      ref={ref}
      id="products"
      className={`section ${styles.products} ${visible ? animationClass : 'opacity-0'}`}
      style={{
        animationDuration: section.styles?.duration || defaultDuration,
        opacity: visible || !animationEnabled ? 1 : 0,
      }}
    >
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">{content.label || '02 — Products'}</span>
          <h2 className="section-title">{content.title || 'Industrial Cooling Solutions'}</h2>
          <p className={styles.subtitle}>{content.subtitle || 'From compact spot coolers to massive tunnel ventilation systems, we have the right cooling technology for your operation.'}</p>
        </div>
        <div className={styles.grid}>
          {products.filter(p => p.available).map((product, index) => {
            const specs = parseSpecs(product.specifications);
            return (
              <div
                key={product.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className={styles.cardImage}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <span className={styles.badge}>{product.available ? 'Available' : 'Out of Stock'}</span>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{product.name}</h3>
                  <p className={styles.cardDesc}>{product.description}</p>
                  <div className={styles.cardSpecs}>
                    <span>{specs.capacity}</span>
                    <span>{specs.size}</span>
                  </div>
                  <button className={styles.cardCta}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Contact for Price
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProduct && (
        <div className={styles.modal} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedProduct(null)}>×</button>
            <div className={styles.modalMedia}>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className={styles.modalDetails}>
              <span className={styles.modalBadge}>{selectedProduct.available ? 'Available' : 'Out of Stock'}</span>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <table className={styles.specsTable}>
                <tbody>
                  <tr><td>Cooling Capacity</td><td>{parseSpecs(selectedProduct.specifications).capacity}</td></tr>
                  <tr><td>Dimensions</td><td>{parseSpecs(selectedProduct.specifications).size}</td></tr>
                  <tr><td>Ideal For</td><td>{parseSpecs(selectedProduct.specifications).usage}</td></tr>
                </tbody>
              </table>
              <a
                href={`https://wa.me/918421001263?text=${encodeURIComponent(`Hi, I'm interested in ${selectedProduct.name}. Please share the pricing details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-primary ${styles.modalCta}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contact for Price
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
