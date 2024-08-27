import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  const mockOnSearch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the header with the correct elements', () => {
    render(<Header onSearch={mockOnSearch} />);

    expect(screen.getByText('E-Commerce Store')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('should toggle the menu on mobile when the button is clicked', async () => {
    render(<Header onSearch={mockOnSearch} />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
  });

  it('should call onSearch with the correct value when the search input changes', () => {
    render(<Header onSearch={mockOnSearch} />);

    const searchInput = screen.getByPlaceholderText('Search products...') as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(mockOnSearch).toHaveBeenCalledWith('test query');
  });

  it('should apply the correct classes to navigation links', () => {
    render(<Header onSearch={mockOnSearch} />);

    const cartLink = screen.getByText('Cart');
    const productsLink = screen.getByText('Products');

    expect(cartLink).toHaveClass('block p-2 rounded bg-blue-500 hover:bg-blue-600');
    expect(productsLink).toHaveClass('block p-2 rounded bg-blue-500 hover:bg-blue-600');
  });
});
