import { createSlice } from "@reduxjs/toolkit";
import { submitTransaction } from "./transactionData";

export interface Transaction {
  amount: number;
  delivery: {
    address: string;
    city: string;
    country: string;
    customer: {
      fullName: string;
      email: string;
      phone: string;
    };
    productId: number;
  };
  card: {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder: string;
  };
}

interface TransactionState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: TransactionState = {
  loading: false,
  error: null,
  success: false,
};


const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitTransaction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetOrder } = transactionSlice.actions;
export default transactionSlice.reducer;