import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Array<{
    id: number;
    title: string;
    thumbnailUrl: string;
    description: string;
    price: number;
    rating: number;
  }>;
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
