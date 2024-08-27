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
  console.log(cartItems);
  return (
    <>
      <head>
        <title>Cart Page</title>
        <meta name="description" content="Manage your cart items here." />
        <meta name="keywords" content="cart, ecommerce, shopping" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://E-Commerce-Store.vercel.app/cart" />

        <meta property="og:title" content="Cart Page" />
        <meta
          property="og:description"
          content="Manage your cart items here."
        />
        {/* <meta
          property="og:image"
          content="https://yourdomain.com/cart-og-image.jpg" // i don't have an image :(
        /> */}
        <meta property="og:url" content="https://E-Commerce-Store.vercel.app/cart" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cart Page" />
        <meta
          name="twitter:description"
          content="Manage your cart items here."
        />
        {/* <meta
          name="twitter:image"
          content="https://yourdomain.com/cart-twitter-card.jpg" // i don't have an image :(
        /> */}
      </head>
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
                <p className="text-green-500 font-bold">${item.price}</p>
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
    </>
  );
};

export default CartPage;
