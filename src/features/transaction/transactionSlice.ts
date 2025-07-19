import { createSlice } from "@reduxjs/toolkit";
import { submitTransaction, checkTransactionStatus } from "./transactionData";

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

export interface TransactionResult {
  id: string;
  status: string;
}

interface TransactionState {
  loading: boolean;
  error: string | null;
  success: boolean;
  transactionResult: TransactionResult | null;
}

const initialState: TransactionState = {
  loading: false,
  error: null,
  success: false,
  transactionResult: null,
};


const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTransaction: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.transactionResult = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.transactionResult = null;
      })
      .addCase(submitTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.transactionResult = action.payload;
      })
      .addCase(submitTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.transactionResult = null;
      })
      .addCase(checkTransactionStatus.fulfilled, (state, action) => {
        state.transactionResult = action.payload;
        if (action.payload.status === "SUCCESS" || action.payload.status === "DECLINED") {
          state.success = action.payload.status === "SUCCESS";
        }
      })
      .addCase(checkTransactionStatus.rejected, (state, action) => {
        if (!state.transactionResult) {
          state.error = action.payload as string;
        }
      });
  },
});

export const { resetTransaction, clearError, clearSuccess } = transactionSlice.actions;
export default transactionSlice.reducer;