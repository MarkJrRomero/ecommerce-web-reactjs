import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { formatPrice } from "../utils/utils";
import CreditCardVisual from "./CreditCardVisual";
import { useDispatch } from "react-redux";
import {
  fetchCountries,
  fetchCities,
  clearCities,
} from "../features/location/locationSlice";

type Props = {
  onClose: () => void;
};

const steps = ["Datos personales", "Datos de tarjeta"];

const personalSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  phone: Yup.string().required("El teléfono es requerido"),
  address: Yup.string().required("La dirección es requerida"),
  city: Yup.string().required("La ciudad es requerida"),
  country: Yup.string().required("El país es requerido"),
});

const cardSchema = Yup.object({
  cardHolder: Yup.string().required(
    "El nombre del titular de la tarjeta es requerido"
  ),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Debe tener 16 dígitos")
    .required("La tarjeta es requerida"),
  expiration: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/YY)")
    .required("La fecha de expiración es requerida"),
  cvc: Yup.string()
    .matches(/^\d{3}$/, "Debe tener 3 dígitos")
    .required("El código de seguridad es requerido"),
});

export default function CreditCardForm({ onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, cities, loading } = useSelector(
    (state: RootState) => state.location
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const [step, setStep] = useState(0);
  const selectedProduct = useSelector(
    (state: RootState) => state.ui.selectedProduct
  );
  const [isCvcFocused, setIsCvcFocused] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      cardHolder: "",
      cardNumber: "",
      expiration: "",
      cvc: "",
    },
    validationSchema: step === 0 ? personalSchema : cardSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (step === 0) {
        // Validar datos personales y pasar al siguiente paso
        personalSchema
          .validate(values, { abortEarly: false })
          .then(() => setStep(1))
          .catch((err) => {
            const errors: Record<string, string> = {};
            err.inner.forEach((e: any) => {
              errors[e.path] = e.message;
            });
            formik.setErrors(errors);
          });
      } else {
        // Validar datos de tarjeta y enviar
        cardSchema
          .validate(values, { abortEarly: false })
          .then(() => {
            // Aquí podrías enviar los datos completos
            console.log("Formulario enviado:", values);
            onClose();
          })
          .catch((err) => {
            const errors: Record<string, string> = {};
            err.inner.forEach((e: any) => {
              errors[e.path] = e.message;
            });
            formik.setErrors(errors);
          });
      }
    },
  });

  return (
    <>
      <Stepper activeStep={step} alternativeLabel sx={{ mb: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {step === 0 && (
            <>
              {selectedProduct && (
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                    INFORMACIÓN DEL PRODUCTO
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, fontWeight: 800 }}>
                    {selectedProduct.name} - {formatPrice(Number(selectedProduct.price))}
                  </Typography>
                </Grid>
              )}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Autocomplete
                  options={countries}
                  loading={loading}
                  value={formik.values.country}
                  onChange={(_, value) => {
                    formik.setFieldValue("country", value);
                    formik.setFieldValue("city", "");
                    if (value) {
                      dispatch(fetchCities(value));
                    } else {
                      dispatch(clearCities());
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="País"
                      error={formik.touched.country && !!formik.errors.country}
                      helperText={
                        formik.touched.country && formik.errors.country
                      }
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Autocomplete
                  options={cities}
                  loading={loading}
                  value={formik.values.city}
                  onChange={(_, value) => formik.setFieldValue("city", value)}
                  disabled={!formik.values.country}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ciudad"
                      error={formik.touched.city && !!formik.errors.city}
                      helperText={formik.touched.city && formik.errors.city}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
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
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Teléfono de contacto"
                  {...formik.getFieldProps("phone")}
                  error={formik.touched.phone && !!formik.errors.phone}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </>
          )}
          {step === 1 && (
            <>
              <Grid size={{ xs: 12 }}>
                <CreditCardVisual
                  cardNumber={formik.values.cardNumber}
                  cardHolder={formik.values.cardHolder}
                  expiration={formik.values.expiration}
                  cvc={formik.values.cvc}
                  isFlipped={isCvcFocused}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Nombre del titular de la tarjeta"
                  {...formik.getFieldProps("cardHolder")}
                  error={
                    formik.touched.cardHolder && !!formik.errors.cardHolder
                  }
                  helperText={
                    formik.touched.cardHolder && formik.errors.cardHolder
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Número de Tarjeta"
                  inputProps={{
                    maxLength: 16,
                  }}
                  {...formik.getFieldProps("cardNumber")}
                  error={
                    formik.touched.cardNumber && !!formik.errors.cardNumber
                  }
                  helperText={
                    formik.touched.cardNumber && formik.errors.cardNumber
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="Expiración (MM/YY)"
                  {...formik.getFieldProps("expiration")}
                  error={
                    formik.touched.expiration && !!formik.errors.expiration
                  }
                  helperText={
                    formik.touched.expiration && formik.errors.expiration
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  label="CVC"
                  {...formik.getFieldProps("cvc")}
                  error={formik.touched.cvc && !!formik.errors.cvc}
                  helperText={formik.touched.cvc && formik.errors.cvc}
                  onFocus={() => setIsCvcFocused(true)}
                  onBlur={() => setIsCvcFocused(false)}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Box display="flex" justifyContent="space-between">
          {step === 1 && (
            <Button
              type="button"
              variant="contained"
              color="inherit"
              sx={{ mr: 2 }}
              fullWidth={false}
              onClick={() => setStep(0)}
            >
              Atrás
            </Button>
          )}
          <Button
            type="button"
            variant="contained"
            fullWidth={step === 0}
            onClick={() => {
              if (step === 0) {
                if (formik.isValid) {
                  setStep(1);
                } else {
                  formik.validateForm();
                }
              } else {
                if (formik.isValid) {
                  formik.handleSubmit();
                } else {
                  formik.validateForm();
                }
              }
            }}
          >
            {step === 0 ? "Siguiente" : "Pagar"}
          </Button>
        </Box>
      </form>
    </>
  );
}
