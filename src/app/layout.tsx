'use client';
import { Provider } from 'react-redux';
import { store, persistor } from '../redux/store';
import '../styles/globals.css';
import Header from '../components/Header';
import React, { useState, createContext } from 'react';
import { PersistGate } from 'redux-persist/integration/react';

export const SearchContext = createContext<{
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}>({
  searchQuery: '',
  setSearchQuery: () => {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Provider store={store}>
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <html lang="en">
          <head>
            <title>Product Page</title>
            <meta name="description" content="Manage your cart items here." />
            <meta name="keywords" content="cart, ecommerce, shopping" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              rel="canonical"
              href="https://E-Commerce-Store.vercel.app"
            />

            <meta property="og:title" content="product page" />
            <meta
              property="og:description"
              content="Manage your cart items here."
            />
            {/* <meta
              property="og:image"
              content="https://yourdomain.com/cart-og-image.jpg" // i don't have an image :(
            /> */}
            <meta property="og:url" content="https://E-Commerce-Store.vercel.app" />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="product Page" />
            <meta
              name="twitter:description"
              content="Manage your cart items here."
            />
            {/* <meta
              name="twitter:image"
              content="https://yourdomain.com/cart-twitter-card.jpg" // i don't have an image :(
            /> */}
          </head>
          <body>
            <PersistGate loading={'loading...'} persistor={persistor}>
              <Header onSearch={setSearchQuery} />
              {children}
            </PersistGate>
          </body>
        </html>
      </SearchContext.Provider>
    </Provider>
  );
}
