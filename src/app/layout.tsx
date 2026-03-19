import type { Metadata, Viewport } from 'next';
import { Inter, Alegreya } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from '@/lib/store';

// Optimize Font Loading with limited weights and display swap to prevent layout shift
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
  style: ['normal', 'italic'],
  weight: ['400', '500', '700', '900'],
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://amarise-maison-avenue.com'),
  title: {
    default: 'AMARISÉ MAISON AVENUE | The Pinnacle of Global Luxury',
    template: '%s | AMARISÉ MAISON AVENUE'
  },
  description: 'Curating the world\'s most exquisite treasures since 1924. Explore exclusive collections in haute couture, high-end watches, and fine jewelry.',
  keywords: ['luxury fashion', 'high-end watches', 'fine jewelry', 'bespoke apparel', 'haute couture', 'luxury shopping'],
  authors: [{ name: 'Amarisé Curation Team' }],
  creator: 'Amarisé Maison',
  publisher: 'Amarisé Maison Avenue',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'AMARISÉ MAISON AVENUE | The Pinnacle of Global Luxury',
    description: 'Curating the world\'s most exquisite treasures since 1924.',
    url: 'https://amarise-maison-avenue.com',
    siteName: 'Amarisé Maison Avenue',
    type: 'website',
    images: [{
      url: 'https://picsum.photos/seed/amarise-og/1200/630',
      width: 1200,
      height: 630,
      alt: 'AMARISÉ MAISON AVENUE Global Flagship'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMARISÉ MAISON AVENUE | The Pinnacle of Global Luxury',
    description: 'The Pinnacle of Global Luxury Heritage since 1924.',
    images: ['https://picsum.photos/seed/amarise-og/1200/630'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/us',
      'en-GB': '/uk',
      'en-AE': '/ae',
      'en-SG': '/sg',
      'en-IN': '/in',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alegreya.variable} light scroll-smooth`}>
      <head>
        {/* Preconnect to critical assets to reduce LCP latency */}
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="preconnect" href="https://madisonavenuecouture.com" />
        
        {/* Structured Data for SEO Authority */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AMARISÉ MAISON AVENUE",
              "url": "https://amarise-maison-avenue.com",
              "logo": "https://picsum.photos/seed/amarise-logo/512/512",
              "sameAs": [
                "https://instagram.com/amarisemaison",
                "https://twitter.com/amarisemaison"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-800-AMARISE",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden selection:bg-gold selection:text-white">
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
