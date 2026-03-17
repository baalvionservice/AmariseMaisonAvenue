
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'AMARISÉ Luxe | The Pinnacle of Global Luxury',
  description: 'Experience curated luxury from around the world. Exclusive collections in fashion, watches, and jewelry.',
  openGraph: {
    title: 'AMARISÉ Luxe',
    description: 'The Pinnacle of Global Luxury',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
