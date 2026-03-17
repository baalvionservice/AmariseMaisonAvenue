
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
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
    images: ['https://picsum.photos/seed/amarise-og/1200/630'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMARISÉ Luxe',
    description: 'The Pinnacle of Global Luxury',
    images: ['https://picsum.photos/seed/amarise-og/1200/630'],
  },
  alternates: {
    languages: {
      'en-US': '/us',
      'en-GB': '/uk',
      'en-AE': '/ae',
      'en-SG': '/sg',
      'en-IN': '/in',
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
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
