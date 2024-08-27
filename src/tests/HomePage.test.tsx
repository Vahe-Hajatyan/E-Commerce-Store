import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/productsSlices';
import HomePage from '../app/page';
import { SearchContext } from '../app/layout';

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

describe('HomePage Component', () => {
  const mockSetSearchQuery = jest.fn();
  const mockSearchContext = {
    searchQuery: '',
    setSearchQuery: mockSetSearchQuery,
  };

  beforeEach(() => {
    store.dispatch({
      type: 'product/setProducts',
      payload: [
        { id: 1, title: 'Product 1', price: 10, rating: 4.5 },
        { id: 2, title: 'Product 2', price: 20, rating: 4.0 },
        { id: 3, title: 'Product 3', price: 30, rating: 5.0 },
      ],
    });
  });

  it('should render the header and product cards', () => {
    render(
      <Provider store={store}>
        <SearchContext.Provider value={mockSearchContext}>
          <HomePage />
        </SearchContext.Provider>
      </Provider>
    );

    expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();
    expect(screen.getByText('Price: Low to High')).toBeInTheDocument();
    expect(screen.getByText('Price: High to Low')).toBeInTheDocument();
    expect(screen.getByText('Rating: Low to High')).toBeInTheDocument();
    expect(screen.getByText('Rating: High to Low')).toBeInTheDocument();
    expect(screen.getAllByText('Product 1')).toHaveLength(1);
    expect(screen.getAllByText('Product 2')).toHaveLength(1);
    expect(screen.getAllByText('Product 3')).toHaveLength(1);
  });

  it('should sort products by price in ascending order', async () => {
    render(
      <Provider store={store}>
        <SearchContext.Provider value={mockSearchContext}>
          <HomePage />
        </SearchContext.Provider>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Sort by:/i), {
      target: { value: 'price-asc' },
    });

    await waitFor(() => {
      const prices = screen
        .getAllByText(/Product \d+/)
        .map((element) => parseFloat(element.textContent!.match(/\d+/)![0]));
      expect(prices).toEqual(prices.slice().sort((a, b) => a - b));
    });
  });

  it('should sort products by rating in descending order', async () => {
    render(
      <Provider store={store}>
        <SearchContext.Provider value={mockSearchContext}>
          <HomePage />
        </SearchContext.Provider>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Sort by:/i), {
      target: { value: 'rating-desc' },
    });

    await waitFor(() => {
      const ratings = screen
        .getAllByText(/Product \d+/)
        .map((element) => parseFloat(element.textContent!.match(/\d+/)![0]));
      expect(ratings).toEqual(ratings.slice().sort((a, b) => b - a));
    });
  });

  it('should paginate products correctly', async () => {
    render(
      <Provider store={store}>
        <SearchContext.Provider value={mockSearchContext}>
          <HomePage />
        </SearchContext.Provider>
      </Provider>
    );

    expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
  });

  it('should filter products by search query', async () => {
    render(
      <Provider store={store}>
        <SearchContext.Provider
          value={{
            searchQuery: 'Product 1',
            setSearchQuery: mockSetSearchQuery,
          }}
        >
          <HomePage />
        </SearchContext.Provider>
      </Provider>
    );

    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Product 3')).not.toBeInTheDocument();
  });

  it('should display "No products available" when there are no products', () => {
    store.dispatch({
      type: 'product/setProducts',
      payload: [],
    });

    render(
      <Provider store={store}>
        <SearchContext.Provider value={mockSearchContext}>
          <HomePage />
        </SearchContext.Provider>
      </Provider>
    );

    expect(screen.getByText('No products available')).toBeInTheDocument();
  });
});
