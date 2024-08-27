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
