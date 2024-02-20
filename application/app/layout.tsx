import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './styles/globals.css';
import React from 'react';
import Header from '@/app/components/Header';
import NavBarChoice from '@/app/components/NavBarChoice';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Flucks',
  description: 'Flucks application',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='fr'>
      <body className={inter.className}>
        <Header />
        <div className={'flex max-sm:flex-col md:flex-row'}>
          <NavBarChoice />
          {children}
        </div>
      </body>
    </html>
  );
}
