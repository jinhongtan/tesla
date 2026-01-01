import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { SkinProvider } from '@/context/SkinContext';
import { AuthProvider } from "@/components/providers/auth-provider";

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
        <AuthProvider>
          <SkinProvider>
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
              {children}
            </main>
          </SkinProvider>
        </AuthProvider>
      </body>
    </html>
  );
}