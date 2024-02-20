import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './styles/globals.css';
import React from 'react';
import Header from '@/app/components/Header';
import NavBar from '@/app/components/NavigationBar';
import NavBarConnected from '@/app/components/NavigationBarConnected';
import Script from 'next/script';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Flucks',
    description: 'Flucks application',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
      <html lang='fr'>
      <body className={inter.className}>
      <Header />
      <div className={'flex md:flex-row max-sm:flex-col'}>
        <NavBarConnected />
        {children}
      </div>
      </body>
      <Script src='https://muazkhan.com:9001/socket.io/socket.io.js'></Script>
      </html>
    );
}
