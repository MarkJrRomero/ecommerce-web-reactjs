import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getEnv } from "../../utils/env";
import type { Product } from "./productSlice";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get<Product[]>(`${getEnv().API_URL}/products`);
  
        console.log(response);
  
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue('Error al cargar productos');
      }
    }
  );