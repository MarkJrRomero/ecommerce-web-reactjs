import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import uiReducer from '../features/ui/uiSlice';
import locationReducer from '../features/location/locationSlice';
import transactionReducer from '../features/transaction/transactionSlice';
import formReducer from '../features/form/formSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    ui: uiReducer,
    location: locationReducer,
    transaction: transactionReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
