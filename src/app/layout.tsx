import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header } from '@/infrastructure/ui/components/common/header';
import '@/infrastructure/ui/styles/globals.css';

export const metadata: Metadata = {
  title: 'BCNC Podcast',
  description: 'Podcast app for BCNC technical test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
