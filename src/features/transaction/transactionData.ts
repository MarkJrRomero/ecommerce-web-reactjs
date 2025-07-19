import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
import type { TransactionResult } from "./transactionSlice";

export const submitTransaction = createAsyncThunk(
  "transaction/submitTransaction",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${getEnv().API_URL}/transactions`, payload, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error en la compra");
    }
  }
);

export const checkTransactionStatus = createAsyncThunk(
  "transaction/checkStatus",
  async (transactionId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getEnv().API_URL}/transactions/${transactionId}`, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data as TransactionResult;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error al verificar el estado de la transacción");
    }
  }
);