import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2";
import type { Product } from "../features/products/productSlice";
import { formatPrice } from "../utils/utils";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { openModal } from "../features/ui/uiSlice";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card
      sx={{
        maxWidth: 340,
        margin: "1.5rem auto",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-6px) scale(1.03)",
          boxShadow: 6,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 220,
            height: 220,
            objectFit: "cover",
            borderRadius: 2,
            boxShadow: 2,
            background: "#f5f5f5",
          }}
          image={product.imageUrl ?? "assets/images/product-placeholder.png"}
          alt={product.name}
        />
      </Box>
      <CardContent sx={{ width: "100%", textAlign: "center", p: 2 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description}
        </Typography>

        <Stack
          direction="column"
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography
            variant="h5"
            color="success"
            fontWeight={700}
            sx={{ mb: 1 }}
          >
            {formatPrice(Number(product.price))}
          </Typography>

          <Chip
            icon={<Inventory2OutlinedIcon fontSize="small" />}
            label={`${product.stock}`}
            size="small"
            color={product.stock > 0 ? "success" : "default"}
            sx={{ fontWeight: 800, padding: 1, fontSize: 16 }}
          />
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          startIcon={<ShoppingCartIcon />}
          sx={{
            mt: 2,
            fontWeight: 700,
            borderRadius: 2,
            boxShadow: 2,
            width: "80%",
          }}
          disabled={product.stock === 0}
          onClick={() => dispatch(openModal(product))}
        >
          {product.stock > 0 ? "Comprar" : "Agotado"}
        </Button>
      </CardContent>
    </Card>
  );
}
