'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { removeFromCart } from '../../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: any) => state.cart.items);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };
console.log(cartItems)
  return (
    <div>
      <h1 className="text-2xl font-bold ml-8 mt-4 mb-8">Your Cart</h1>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item: any) => (
            <li key={item.id} className="border rounded p-4 shadow mb-4">
              <img
                src={item.thumbnailUrl}
                alt="img"
                className="w-full h-36 object-cover mb-4"
              />
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="text-green-500 font-bold">
                ${item.price}
              </p>
              <p>{'⭐'.repeat(item.rating)}</p>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
