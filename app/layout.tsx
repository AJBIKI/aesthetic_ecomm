import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BagDrawer } from '@/components/layout/bag-drawer';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { InitialLoader } from '@/components/brand/loader';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

export const metadata: Metadata = {
  title: 'the monsoon club. | quiet luxury dress atelier',
  description: 'an editorial dress studio for rain-soaked evenings, slow silhouettes, and quiet luxury. 30-momme mulberry silks and organic draped crepes.',
  openGraph: {
    title: 'the monsoon club.',
    description: 'quiet luxury dresses for slow evenings.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body>
        <InitialLoader />
        <ScrollProgress />
        <Header />
        
        <main className="min-h-screen">
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
