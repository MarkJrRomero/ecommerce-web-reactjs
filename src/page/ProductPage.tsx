import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import ProductCard from "../components/ProductCard";
import { Alert, CircularProgress, Container, Typography, Box } from "@mui/material";
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      
      {/* Sección de productos */}
      <Container maxWidth="xl" sx={{ py: 6, flex: 1 }}>
        
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={60} />
          </Box>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {items.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
        
        {!loading && items.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No se encontraron productos
            </Typography>
          </Box>
        )}
      </Container>

    </Box>
  );
}
