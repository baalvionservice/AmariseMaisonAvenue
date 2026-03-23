import type { Metadata, Viewport } from 'next';
import { Inter, Alegreya } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from '@/lib/store';

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
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://amarise-maison-avenue.com'),
  title: {
    default: 'AMARISÉ MAISON AVENUE | The Pinnacle of Global Luxury',
    template: '%s | AMARISÉ MAISON AVENUE'
  },
  description: 'Curating the world\'s most exquisite treasures since 1924. Explore exclusive collections in haute couture, high-end watches, and fine jewelry.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alegreya.variable} light scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="preconnect" href="https://madisonavenuecouture.com" />
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
