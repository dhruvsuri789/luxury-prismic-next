import { repositoryName } from '@/prismicio';
import { PrismicPreview } from '@prismicio/next';
import localFont from 'next/font/local';

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
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
