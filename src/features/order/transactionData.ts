import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";

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