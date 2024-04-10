import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './styles/globals.css';
import React from 'react';
import Header from '@/app/components/Header';
import isUserLog from '@/app/utils/isUserLog';
import NavBarConnected from '@/app/components/NavigationBarConnected';
import NavBar from '@/app/components/NavBar';
import HeaderConnected from '@/app/components/HeaderConnected';
import Script from 'next/script';


const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Flucks',
    description: 'Flucks application',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    const isAuth = isUserLog();

    return (
        <html lang='fr'>
        <head>
            <Script src='https://muazkhan.com:9001/socket.io/socket.io.js'></Script>
        </head>
        <body className={inter.className}>
        {isAuth ? <HeaderConnected/> : <Header/>}
        <div className={'flex max-md:flex-col-reverse max-md:justify-center max-md:items-center md:flex-row'}>
            {isAuth ? <NavBarConnected/> : <NavBar/>}
            <div className={'max-md:pb-24 md:margin_content flex justify-center w-full'}>
                {children}
            </div>
        </div>
        </body>
        </html>
    );
}
