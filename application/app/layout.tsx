import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import React from 'react';
import HeaderLayout from "./components/Header";
import NavBar from "./components/NavigationBar";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Flucks',
    description: 'Flucks application',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang='fr'>
            <body className={inter.className}>
                <HeaderLayout />
                <div className={'flex flex-row'}>
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    );
}
