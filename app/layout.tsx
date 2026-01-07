import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { SkinProvider } from '@/context/SkinContext';
import { AuthProvider } from "@/components/providers/auth-provider";
import { Suspense } from 'react'; // 1. Import Suspense

const inter = Inter({ subsets: ['latin'] });
import { ClientOnly } from '@/components/ClientOnly';

// ... other imports

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {/* Wrap everything that uses browser-side hooks/refs */}
          <ClientOnly>
            <SkinProvider>
              <Header />
              <main className="max-w-7xl mx-auto  sm:px-6 lg:px-8 min-h-screen">
                {children}
              </main>
            </SkinProvider>
          </ClientOnly>
        </AuthProvider>
      </body>
    </html>
  );
}