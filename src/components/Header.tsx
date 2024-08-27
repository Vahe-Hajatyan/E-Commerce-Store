'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
}

function Header({ onSearch }: HeaderProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    onSearch(query);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="p-4 bg-gray-800 text-white flex flex-col md:flex-row md:justify-between items-center">
      <div className="flex justify-between items-center w-full">
        <Link href={'/'} className="text-2xl">
          E-Commerce Store
        </Link>
        <button
          onClick={toggleMenu}
          className="block md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? 'x' : '☰'}
        </button>
      </div>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search products..."
        className={`p-2 rounded text-black outline-none md:mt-0 mt-3 md:w-1/3 mr-3 ${pathname === '/cart' ? 'hidden' : ''}`}
      />
      <nav
        className={`flex flex-col gap-2 md:flex-row md:space-x-4 mt-4 md:mt-0 md:flex ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <Link
          href="/cart"
          className={`block p-2 rounded bg-blue-500 hover:bg-blue-600`}
        >
          Cart
        </Link>
        <Link
          href="/"
          className={`block p-2 rounded bg-blue-500 hover:bg-blue-600`}
        >
          Products
        </Link>
      </nav>
    </header>
  );
}

export default Header;
