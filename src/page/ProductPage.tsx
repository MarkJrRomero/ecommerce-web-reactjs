import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import ProductCard from "../components/ProductCard";
import { Alert, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { fetchProducts } from "../features/products/productsData";
import type { AppDispatch } from "../redux/store";

export default function ProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 3 }} />
      )}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={4} justifyContent="center">
        {items.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
