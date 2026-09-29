import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CMSProvider } from '@/context/CMSContext';

export const metadata = {
  title: 'Unique Enterprises | Heavy Duty Industrial Air Coolers',
  description: 'Premium quality industrial air coolers engineered for extreme conditions. Built to perform in foundries, steel mills, textile plants, and outdoor environments.',
  keywords: 'industrial air coolers, heavy duty coolers, cooling solutions, factory cooling',
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230D0D0D' width='100' height='100' rx='8'/><path d='M25 50h50M50 25v50' stroke='%235B8A9A' stroke-width='6'/></svg>" />
      </head>
      <body>
        <AuthProvider>
          <CMSProvider>
            {children}
          </CMSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
