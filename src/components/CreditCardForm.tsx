import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Grid, Box, Stepper, Step, StepLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import {
  enforceDateExpiration,
  enforceNumber,
  enforceText,
  formatPrice,
  getCardType,
} from "../utils/utils";
import { fetchCountries } from "../features/location/locationSlice";
import PersonalDataStep from "./form-steps/PersonalDataStep";
import CardDataStep from "./form-steps/CardDataStep";
import SummaryStep from "./form-steps/SummaryStep";
import { submitTransaction } from "../features/transaction/transactionData";
import { clearError } from "../features/transaction/transactionSlice";
import type { Transaction } from "../features/transaction/transactionSlice";
import CardProcessingAnimation from "./CardProcessingAnimation";
import Alert from "./Alert";
import { useTransactionPolling } from "../hooks/useTransactionPolling";

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

export default function CreditCardForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { countries, cities, loading } = useSelector(
    (state: RootState) => state.location
  );
  const transactionState = useSelector((state: RootState) => state.transaction);
  
  // Hook para manejar el polling de la transacción
  const { isPolling, transactionStatus } = useTransactionPolling();

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
      }
    },
  });

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <>
      {transactionState.loading ? (
        <CardProcessingAnimation
          brand={getCardType(formik.values.cardNumber)}
        />
      ) : (
        <>
          {!transactionStatus && (
            <Stepper activeStep={step} alternativeLabel sx={{ mb: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}
            {transactionState.error && (
              <Alert
                type="error"
                title="Error en la transacción"
                message="Ocurrió un error al procesar la transacción. Por favor, intenta nuevamente."
                onClose={() => dispatch(clearError())}
              />
            )}
            {transactionStatus === "PENDING" && (
              <Alert
                type="warning"
                title="Transacción en proceso"
                message={`Tu compra se está procesando. Verificando estado cada 5 segundos... ${isPolling ? '🔄' : ''}`}
              />
            )}
            {transactionStatus === "APPROVED" && (
              <Alert
                type="success"
                title="¡Transacción exitosa!"
                message="Tu compra se ha procesado correctamente. ¡Gracias por tu compra!, esta ventana se cerrará automáticamente en 10 segundos"
              />
            )}
            {transactionStatus === "DECLINED" && (
              <Alert
                type="error"
                title="Transacción rechazada"
                message="Tu compra fue rechazada (Esto puede pasar por falta de fondos, datos incorrectos, problemas del sistema, etc.), esta ventana se cerrará automáticamente en 10 segundos"
              />
            )}
          <form>
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
                  formik={formik as any}
                  selectedProduct={selectedProduct ?? {
                    id: 0,
                    name: "",
                    price: 0,
                    description: "",
                    imageUrl: "",
                    stock: 0,
                  }}
                  formatPrice={formatPrice}
                />
              )}
            </Grid>
                          <Box display="flex" justifyContent="space-between">
                {step > 0 && !transactionStatus && (
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
                {!transactionStatus && (
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
                      if (valid) setStep(1);
                      else formik.validateForm();
                    } else if (step === 1) {
                      formik.setTouched({
                        cardHolder: true,
                        cardNumber: true,
                        expiration: true,
                        cvc: true,
                      });
                      const valid = await cardSchema.isValid(formik.values);
                      if (valid) setStep(2);
                      else formik.validateForm();
                    } else if (step === 2) {
                      const {
                        name,
                        email,
                        phone,
                        address,
                        city,
                        country,
                        cardHolder,
                        cardNumber,
                        expiration,
                        cvc,
                      } = formik.values;
                      const [exp_month, exp_year] = expiration.split("/");

                      const payload: Transaction = {
                        amount: Number(selectedProduct?.price ?? 0) * 100,
                        delivery: {
                          address,
                          city,
                          country,
                          customer: {
                            fullName: name,
                            email,
                            phone,
                          },
                          productId: selectedProduct?.id ?? 0,
                        },
                        card: {
                          number: cardNumber,
                          exp_month,
                          exp_year,
                          cvc,
                          card_holder: cardHolder,
                        },
                      };

                      dispatch(submitTransaction(payload));
                    }
                  }}
                >
                  {step === 0
                    ? "Siguiente"
                    : step === 1
                    ? "Resumen"
                    : "Confirmar"}
                </Button>
              )}
            </Box>
          </form>
        </>
      )}
    </>
  );
}
