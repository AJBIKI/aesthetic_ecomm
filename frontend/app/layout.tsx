import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BagDrawer } from '@/components/layout/bag-drawer';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { InitialLoader } from '@/components/brand/loader';
import { BackgroundArt } from '@/components/brand/background-art';
import { StartupLogger } from '@/components/brand/startup-logger';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Monsoon Club. | Quiet Luxury Dress Atelier',
  description: 'An editorial dress studio for rain-soaked evenings, slow silhouettes, and quiet luxury. 30-momme mulberry silks and organic draped crepes.',
  openGraph: {
    title: 'The Monsoon Club.',
    description: 'Quiet luxury dresses for slow evenings.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="bg-[oklch(0.94_0.02_145)] text-[oklch(0.14_0.025_145)]">
        <InitialLoader />
        <ScrollProgress />
        <BackgroundArt />
        <StartupLogger />
        <Header />
        
        <main className="min-h-screen relative z-10">
          {children}
        </main>

        <Footer />
        <BagDrawer />

        {/* Grain Texture Overlay */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
