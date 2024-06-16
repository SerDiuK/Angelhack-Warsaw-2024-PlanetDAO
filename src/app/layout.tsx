'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Header from './features/Header';
import { Web3Provider } from './contexts/Web3Context';
import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <Web3Provider>
          <body className={`${inter.className} bg-goku`}>
            <Header />
            {children}
            <ToastContainer />
          </body>
        </Web3Provider>
      </UserProvider>
    </html>
  );
}
