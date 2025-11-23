import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/infrastructure/ui/components/common/header';
import { NavigationProvider } from '@/infrastructure/ui/context/navigation-context';
import '@/infrastructure/ui/styles/globals.css';
import '@/infrastructure/ui/styles/loading.css';

export const metadata: Metadata = {
  title: 'Podcaster',
  description: 'Podcast App built with Next.js 16',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <Header />
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
