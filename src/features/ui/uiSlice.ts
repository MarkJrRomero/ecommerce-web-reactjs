import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../products/productSlice';

type UIState = {
  selectedProduct: Product | null;
  modalOpen: boolean;
};

const initialState: UIState = {
  selectedProduct: null,
  modalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.selectedProduct = null;
    },
  },
});

export const { openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
