import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addToCart } from '../redux/cartSlice';
import Image from 'next/image';

interface ProductCardProps {
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  price: number | null | undefined;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id = 0,
  title = 'Default Title',
  thumbnailUrl = '',
  description = 'Default Description',
  price = 'N/A',
  rating = 0,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = () => {
    dispatch(
      addToCart({ id, title, thumbnailUrl, description, price, rating })
    );
  };

  const truncatedDescription =
    description?.length > 100
      ? description.substring(0, 97) + '...'
      : description;

  console.log(truncatedDescription);

  let formattedPrice = 'Price Unavailable';
  if (price !== null && price !== undefined && !isNaN(price as number)) {
    formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price as number);
  }

  const validRating = Math.min(Math.max(rating, 0), 5);

  return (
    <div className="border rounded p-4 shadow">
      <Image
        priority
        width={150}
        height={150}
        src={thumbnailUrl}
        alt={`Image of ${title}`}
        className="w-full h-32 object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{truncatedDescription}</p>
      <p className="text-green-500 font-bold">{formattedPrice}</p>
      <p>{'⭐'.repeat(validRating)}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
