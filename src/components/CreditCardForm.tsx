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
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { enforceDateExpiration, enforceNumber, enforceText, formatPrice } from "../utils/utils";
import CreditCardVisual from "./CreditCardVisual";
import { useDispatch } from "react-redux";
import {
  fetchCountries,
  fetchCities,
  clearCities,
} from "../features/location/locationSlice";
import PersonalDataStep from "./form-steps/PersonalDataStep";
import CardDataStep from "./form-steps/CardDataStep";
import SummaryStep from "./form-steps/SummaryStep";

type Props = {
  onClose: () => void;
};

const steps = ["Datos personales", "Datos de tarjeta", "Resumen"];

const personalSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  email: Yup.string().email("Email inválido").required("El email es requerido"),
  phone: Yup.string().required("El teléfono es requerido"),
  address: Yup.string().required("La dirección es requerida"),
  city: Yup.string().required("La ciudad es requerida"),
  country: Yup.string().required("El país es requerido"),
});

const cardSchema = Yup.object({
  cardHolder: Yup.string()
    .matches(/^[A-Z\s]+$/, "El nombre debe contener solo letras")
    .min(5, "El nombre debe tener al menos 5 letras")
    .required("El nombre del titular de la tarjeta es requerido"),
  cardNumber: Yup.string()
    .matches(/^[0-9\s]+$/, "Debe contener solo números")
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
    validationSchema:
      step === 0 ? personalSchema : step === 1 ? cardSchema : Yup.object({}),
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
      } else if (step === 1) {
        // Validar datos de tarjeta y pasar al siguiente paso
        cardSchema
          .validate(values, { abortEarly: false })
          .then(() => setStep(2))
          .catch((err) => {
            const errors: Record<string, string> = {};
            err.inner.forEach((e: any) => {
              errors[e.path] = e.message;
            });
            formik.setErrors(errors);
          });
      } else if (step === 2) {
        // Acción final: enviar datos
        console.log("Formulario enviado:", values);
        onClose();
      }
    },
  });

  const handleNext = () => {
    if (step === 0) {
      personalSchema
        .validate(formik.values, { abortEarly: false })
        .then(() => setStep(1))
        .catch((err) => {
          const errors: Record<string, string> = {};
          err.inner.forEach((e: any) => {
            errors[e.path] = e.message;
          });
          formik.setErrors(errors);
        });
    } else if (step === 1) {
      cardSchema
        .validate(formik.values, { abortEarly: false })
        .then(() => setStep(2))
        .catch((err) => {
          const errors: Record<string, string> = {};
          err.inner.forEach((e: any) => {
            errors[e.path] = e.message;
          });
          formik.setErrors(errors);
        });
    } else if (step === 2) {
      // Acción final: enviar datos
      console.log("Formulario enviado:", formik.values);
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <>
      <Stepper activeStep={step} alternativeLabel sx={{ mb: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form autoComplete="off">
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {step === 0 && (
            <PersonalDataStep
              formik={formik}
              countries={countries}
              cities={cities}
              loading={loading}
              dispatch={dispatch}
            />
          )}
          {step === 1 && (
            <CardDataStep
              formik={formik}
              isCvcFocused={isCvcFocused}
              setIsCvcFocused={setIsCvcFocused}
              enforceText={enforceText}
              enforceNumber={enforceNumber}
              enforceDateExpiration={enforceDateExpiration}
            />
          )}
          {step === 2 && (
            <SummaryStep
              formik={formik}
              selectedProduct={selectedProduct}
              formatPrice={formatPrice}
            />
          )}
        </Grid>
        <Box display="flex" justifyContent="space-between">
          {step > 0 && (
            <Button
              type="button"
              variant="contained"
              color="inherit"
              sx={{ mr: 2 }}
              fullWidth={false}
              onClick={handleBack}
            >
              Atrás
            </Button>
          )}
          <Button
            type="button"
            variant="contained"
            color={step === 2 ? "success" : "primary"}
            fullWidth={step === 0}
            onClick={async () => {
              if (step === 0) {
                formik.setTouched({
                  name: true,
                  address: true,
                  email: true,
                  phone: true,
                  city: true,
                  country: true,
                });
                const valid = await personalSchema.isValid(formik.values);
                if (valid) handleNext();
                else formik.validateForm();
              } else if (step === 1) {
                formik.setTouched({
                  cardHolder: true,
                  cardNumber: true,
                  expiration: true,
                  cvc: true,
                });
                const valid = await cardSchema.isValid(formik.values);
                if (valid) handleNext();
                else formik.validateForm();
              } else if (step === 2) {
                handleNext();
              }
            }}
          >
            {step === 0 ? "Siguiente" : step === 1 ? "Resumen" : "Confirmar"}
          </Button>
        </Box>
      </form>
    </>
  );
}
