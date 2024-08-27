import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartSliceReducer from './cartSlice';
import productsSlices from './productsSlices';

const persistCartConfig = {
  key: 'cart',
  storage,
};
const persistProductConfig = {
  key: 'product',
  storage,
};

const persistedCartReducer = persistReducer(
  persistCartConfig,
  cartSliceReducer
);
const persistedProductsReducer = persistReducer(
  persistProductConfig,
  productsSlices
);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    product: persistedProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
