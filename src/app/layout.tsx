import { createClient, repositoryName } from '@/prismicio';
import { PrismicPreview } from '@prismicio/next';
import localFont from 'next/font/local';

import { Footer } from '@/components/Footer';
import NavBar from '@/components/Navbar';
import { isFilled } from '@prismicio/client';
import { Metadata } from 'next';
import './globals.css';

const gambarino = localFont({
  src: '../fonts/Gambarino-Regular.woff2',
  display: 'swap',
  variable: '--font-gambarino',
});

// Fallback for every page
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle('settings');

  return {
    title: settings.data.site_title || 'Côte Royale Paris',
    description:
      settings.data.meta_description ||
      'Discover the exquisite collection of luxury fragrances by Côte Royale Paris',
    openGraph: {
      images: isFilled.image(settings.data.fallback_og_image)
        ? [settings.data.fallback_og_image.url]
        : ['/cote-royale-og-image.png'],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gambarino.variable} antialiased`}>
      <body className="bg-neutral-900 text-white">
        <NavBar />
        <main className="pt-14 md:pt-16">{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
