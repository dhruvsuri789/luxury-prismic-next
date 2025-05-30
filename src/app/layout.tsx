import { repositoryName } from '@/prismicio';
import { PrismicPreview } from '@prismicio/next';
import localFont from 'next/font/local';

import './globals.css';

const gambarino = localFont({
  src: '../../public/fonts/Gambarino-Regular.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-gambarino',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gambarino.variable}>
      <body>{children}</body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
