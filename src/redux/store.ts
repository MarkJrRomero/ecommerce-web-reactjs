import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import uiReducer from '../features/ui/uiSlice';
import locationReducer from '../features/location/locationSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    ui: uiReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
