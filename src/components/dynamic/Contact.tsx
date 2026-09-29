'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageSection } from '@/types';
import styles from './Contact.module.css';

interface Props {
  section: PageSection;
  animationEnabled?: boolean;
  defaultDuration?: string;
}

export default function DynamicContact({ section, animationEnabled = true, defaultDuration = '0.6s' }: Props) {
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSent(true);
      setSending(false);
      setFormState({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className={`section ${styles.contact} ${visible ? animationClass : 'opacity-0'}`}
      style={{
        animationDuration: section.styles?.duration || defaultDuration,
        opacity: visible || !animationEnabled ? 1 : 0,
      }}
    >
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <span className="section-label">{content.label || '04 — Contact'}</span>
            <h2 className="section-title">{content.title || "Let's Discuss Your Cooling Requirements"}</h2>
            <p className={styles.desc}>{content.desc || 'Our engineering team provides custom solutions for unique industrial cooling challenges. Share your requirements and we\'ll recommend the optimal configuration.'}</p>
            
            <div className={styles.details}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.detailLabel}>{content.phoneLabel || 'Phone'}</span>
                  <a href="tel:+918421001263" className={styles.detailValue}>{content.phoneValue || '+91 84210 01263'}</a>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.detailLabel}>{content.emailLabel || 'Email'}</span>
                  <a href="mailto:unique8421@gmail.com" className={styles.detailValue}>{content.emailValue || 'unique8421@gmail.com'}</a>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className={styles.detailLabel}>{content.addressLabel || 'Factory'}</span>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={styles.detailValue}>{content.addressValue || 'View on Google Maps'}</a>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formWrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h3>{content.formTitle || 'Request a Quote'}</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input type="text" id="name" value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} required placeholder=" " />
                  <label htmlFor="name">{content.nameLabel || 'Full Name'}</label>
                </div>
                <div className={styles.formGroup}>
                  <input type="email" id="email" value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} required placeholder=" " />
                  <label htmlFor="email">{content.emailLabel2 || 'Email Address'}</label>
                </div>
              </div>
              <div className={styles.formGroup}>
                <input type="tel" id="phone" value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} required placeholder=" " />
                <label htmlFor="phone">{content.phoneLabel2 || 'Phone Number'}</label>
              </div>
              <div className={styles.formGroup}>
                <textarea id="message" rows={4} value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })} required placeholder=" "></textarea>
                <label htmlFor="message">{content.messageLabel || 'Your Requirements'}</label>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                {sending ? 'Sending...' : sent ? 'Message Sent!' : (content.submitText || 'Send Message')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
