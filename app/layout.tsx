// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { SkinProvider } from '@/context/SkinContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tesla-Skin | Premium 3D Wraps for Your Tesla',
  description: 'Browse and download premium 3D wraps and skins for all Tesla models',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <SkinProvider>
          {children}
        </SkinProvider>
      </body>
    </html>
  );
}