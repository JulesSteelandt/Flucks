import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './styles/globals.css';
import React from 'react';
import Header from '@/app/components/Header';
import isUserLog from '@/app/utils/isUserLog';
import NavBarConnected from '@/app/components/NavigationBarConnected';
import NavBar from '@/app/components/NavBar';
import HeaderConnected from '@/app/components/HeaderConnected';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Flucks',
  description: 'Flucks application',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const isAuth = isUserLog();

  return (
    <html lang='fr'>
      <body className={inter.className}>
        {isAuth ? <HeaderConnected /> : <Header />}
        <div className={'flex max-sm:flex-col md:flex-row'}>
          {isAuth ? <NavBarConnected /> : <NavBar />}
          {children}
        </div>
      </body>
    </html>
  );
}
