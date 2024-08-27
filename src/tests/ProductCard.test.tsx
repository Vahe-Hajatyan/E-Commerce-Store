import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('ProductCard', () => {
  const product = {
    id: 1,
    title: 'Sample Product',
    thumbnailUrl: 'https://via.placeholder.com/150',
    description: 'This is a sample product description.',
    price: 99.99,
    rating: 4,
  };

  test('renders product information correctly', () => {
    render(
      <Provider store={store}>
        <ProductCard {...product} />
      </Provider>
    );

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(
      screen.getByText('This is a sample product description.')
    ).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('⭐⭐⭐⭐')).toBeInTheDocument();
  });

  test('handles add to cart button click', () => {
    render(
      <Provider store={store}>
        <ProductCard {...product} />
      </Provider>
    );

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);
  });
});
