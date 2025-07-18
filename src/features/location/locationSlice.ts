import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "location/fetchCountries",
  async () => {
    const res = await axios.get("https://countriesnow.space/api/v0.1/countries/positions");
    // Devuelve solo los nombres de los países
    return res.data.data.map((c: any) => c.name);
  }
);

export const fetchCities = createAsyncThunk(
  "location/fetchCities",
  async (country: string) => {
    const res = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", { country });
    return res.data.data;
  }
);

type LocationState = {
  countries: string[];
  cities: string[];
  loading: boolean;
  error: string | null;
};

const initialState: LocationState = {
  countries: [],
  cities: [],
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearCities(state) {
      state.cities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.loading = false;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.loading = false;
        state.error = "Error al cargar países";
      })
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
        state.loading = false;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.loading = false;
        state.error = "Error al cargar ciudades";
      });
  },
});

export const { clearCities } = locationSlice.actions;
export default locationSlice.reducer;