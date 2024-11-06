'use client'
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
