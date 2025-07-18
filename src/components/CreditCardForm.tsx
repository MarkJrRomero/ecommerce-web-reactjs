import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

type Props = {
  onClose: () => void;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  address: Yup.string().required("Requerido"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Debe tener 16 dígitos")
    .required("Requerido"),
  expiration: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/YY)")
    .required("Requerido"),
  cvc: Yup.string()
    .matches(/^\d{3}$/, "Debe tener 3 dígitos")
    .required("Requerido"),
});

export default function CreditCardForm({ onClose }: Props) {
    
  const selectedProduct = useSelector(
    (state: RootState) => state.ui.selectedProduct
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      cardNumber: "",
      expiration: "",
      cvc: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Formulario enviado:", values);
      onClose(); // cerrar modal tras éxito
    },
  });

  return (
    <>
      {selectedProduct && (
        <Box mb={2}>
          <Typography variant="subtitle1">
            Producto: {selectedProduct.name}
          </Typography>
          <Typography variant="subtitle2">
            Precio: ${Number(selectedProduct.price).toLocaleString()}
          </Typography>
        </Box>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Nombre Completo"
              {...formik.getFieldProps("name")}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Dirección de entrega"
              {...formik.getFieldProps("address")}
              error={formik.touched.address && !!formik.errors.address}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Número de Tarjeta"
              {...formik.getFieldProps("cardNumber")}
              error={formik.touched.cardNumber && !!formik.errors.cardNumber}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Expiración (MM/YY)"
              {...formik.getFieldProps("expiration")}
              error={formik.touched.expiration && !!formik.errors.expiration}
              helperText={formik.touched.expiration && formik.errors.expiration}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="CVC"
              {...formik.getFieldProps("cvc")}
              error={formik.touched.cvc && !!formik.errors.cvc}
              helperText={formik.touched.cvc && formik.errors.cvc}
            />
          </Grid>
        </Grid>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Continuar
        </Button>
      </form>
    </>
  );
}
