import { Grid, TextField } from "@mui/material";
import CreditCardVisual from "../CreditCardVisual";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<any>;
  isCvcFocused: boolean;
  setIsCvcFocused: (v: boolean) => void;
  enforceText: (v: string) => string;
  enforceNumber: (v: string) => string;
  enforceDateExpiration: (v: string) => string;
}

export default function CardDataStep({ formik, isCvcFocused, setIsCvcFocused, enforceText, enforceNumber, enforceDateExpiration }: Props) {
  return (
    <>
      <Grid item xs={12}>
        <CreditCardVisual
          cardNumber={formik.values.cardNumber}
          cardHolder={formik.values.cardHolder}
          expiration={formik.values.expiration}
          cvc={formik.values.cvc}
          isFlipped={isCvcFocused}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          InputProps={{
            inputProps: {
              maxLength: 20,
              minLength: 5,
            },
          }}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = enforceText(input.value).toUpperCase();
          }}
          label="Nombre del titular de la tarjeta"
          {...formik.getFieldProps("cardHolder")}
          error={formik.touched.cardHolder && !!formik.errors.cardHolder}
          helperText={formik.touched.cardHolder && formik.errors.cardHolder}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Número de Tarjeta"
          inputProps={{ maxLength: 16 }}
          {...formik.getFieldProps("cardNumber")}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = enforceNumber(input.value);
          }}
          error={formik.touched.cardNumber && !!formik.errors.cardNumber}
          helperText={formik.touched.cardNumber && formik.errors.cardNumber}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Expiración (MM/YY)"
          inputProps={{ maxLength: 5, minLength: 5 }}
          {...formik.getFieldProps("expiration")}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = enforceDateExpiration(input.value);
          }}
          error={formik.touched.expiration && !!formik.errors.expiration}
          helperText={formik.touched.expiration && formik.errors.expiration}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="CVC"
          inputProps={{ maxLength: 3, minLength: 3 }}
          {...formik.getFieldProps("cvc")}
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = enforceNumber(input.value);
          }}
          error={formik.touched.cvc && !!formik.errors.cvc}
          helperText={formik.touched.cvc && formik.errors.cvc}
          onFocus={() => setIsCvcFocused(true)}
          onBlur={() => setIsCvcFocused(false)}
        />
      </Grid>
    </>
  );
} 