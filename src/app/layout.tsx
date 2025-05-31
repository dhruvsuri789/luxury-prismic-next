import { repositoryName } from '@/prismicio';
import { PrismicPreview } from '@prismicio/next';
import localFont from 'next/font/local';

import { Footer } from '@/components/Footer';
import NavBar from '@/components/Navbar';
import './globals.css';

const gambarino = localFont({
  src: '../fonts/Gambarino-Regular.woff2',
  display: 'swap',
  variable: '--font-gambarino',
});

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
