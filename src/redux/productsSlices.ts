import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
interface Product {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
interface ProductsState {
  products: Product[];
  currentPage: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/photos'
      );
      const enrichedData = response.data.map((product: Product) => ({
        ...product,
        price: (Math.random() * 90 + 10).toFixed(2),
        rating: Math.floor(Math.random() * 5) + 1,
      }));

      return enrichedData;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        action.payload.length = 100;
        state.products = action.payload;
        state.totalPages = Math.ceil(state.products.length / state.pageSize);
      })
      .addCase(getProducts.rejected, (state) => {
        state.error = 'Something went wrong';
      });
  },
});

export const { setPage } = productsSlice.actions;
export default productsSlice.reducer;
