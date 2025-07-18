import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';
import { Grid } from '@mui/material';

export default function ProductPage() {
  const products = useSelector((state: RootState) => state.products);

  return (
      <Grid container spacing={2} >
        {products.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
  );
}
