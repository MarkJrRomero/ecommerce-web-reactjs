import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import type { Product } from '../features/products/productSlice';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card sx={{ maxWidth: 300, margin: '1rem auto' }}>
      <CardMedia
        component="img"
        height="250"
        image={product.imageUrl ?? 'assets/images/product-placeholder.png'}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="subtitle1">${product.price.toLocaleString()}</Typography>
        <Typography variant="caption">Stock: {product.stock}</Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 1 }}
        >
          Comprar
        </Button>
      </CardContent>
    </Card>
  );
}
