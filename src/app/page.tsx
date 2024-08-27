'use client';
import React from 'react';
import { useContext, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getProducts, setPage } from '../redux/productsSlices';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { SearchContext } from './layout';

interface Product {
  albumId?: number;
  id?: number;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
  description?: string;
  price?: number;
  rating?: number;
}

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchQuery } = useContext(SearchContext);

  const [sortCriteria, setSortCriteria] = useState<'price' | 'rating'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const productsState = useSelector((state: RootState) => state.product);

  useLayoutEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const filteredProducts = productsState.products.filter((product: Product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort(
    (a: Product, b: Product) => {
      if (sortCriteria === 'price') {
        return sortOrder === 'asc'
          ? (a.price ?? 0) - (b.price ?? 0)
          : (b.price ?? 0) - (a.price ?? 0);
      } else if (sortCriteria === 'rating') {
        return sortOrder === 'asc'
          ? (a.rating ?? 0) - (b.rating ?? 0)
          : (b.rating ?? 0) - (a.rating ?? 0);
      }
      return 0;
    }
  );

  const paginatedProducts = sortedProducts.slice(
    (productsState.currentPage - 1) * productsState.pageSize,
    productsState.currentPage * productsState.pageSize
  );

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [criteria, order] = event.target.value.split('-') as [
      'price' | 'rating',
      'asc' | 'desc'
    ];
    setSortCriteria(criteria);
    setSortOrder(order);
  };

  if (filteredProducts.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <div className="my-4 ml-4">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          onChange={handleSortChange}
          className="p-2 border rounded"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
        {paginatedProducts.length === 0 ? (
          <div>No products available</div>
        ) : (
          paginatedProducts.map((product: any) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>
      <Pagination
        totalPages={Math.ceil(filteredProducts.length / productsState.pageSize)}
        currentPage={productsState.currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
