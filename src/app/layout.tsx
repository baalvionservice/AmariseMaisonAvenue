
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

/**
 * RootLayout optimized for Global SEO and Asset Delivery.
 * Features hreflang support and canonical link logic for multi-country hubs.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://amarise-luxe.com'),
  title: {
    default: 'AMARISÉ Luxe | The Pinnacle of Global Luxury',
    template: '%s | AMARISÉ Luxe'
  },
  description: 'Experience curated luxury from around the world. Exclusive collections in fashion, watches, and fine jewelry. Hand-crafted heritage for the modern era.',
  keywords: 'luxury fashion, high-end watches, fine jewelry, bespoke apparel, haute couture, luxury shopping',
  openGraph: {
    title: 'AMARISÉ Luxe | The Pinnacle of Global Luxury',
    description: 'Curating the world\'s most exquisite treasures since 1924.',
    type: 'website',
    images: [{
      url: 'https://picsum.photos/seed/amarise-og/1200/630',
      width: 1200,
      height: 630,
      alt: 'AMARISÉ Luxe Global Flagship'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMARISÉ Luxe | The Pinnacle of Global Luxury',
    description: 'The Pinnacle of Global Luxury Heritage',
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
        {/* JSON-LD Structured Data for the Maison */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AMARISÉ Luxe",
              "url": "https://amarise-luxe.com",
              "logo": "https://picsum.photos/seed/amarise-logo/512/512",
              "sameAs": [
                "https://instagram.com/amariseluxe",
                "https://twitter.com/amariseluxe"
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
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
