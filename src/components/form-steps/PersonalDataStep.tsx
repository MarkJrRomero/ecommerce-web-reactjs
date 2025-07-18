import { Autocomplete, CircularProgress, Grid, TextField } from "@mui/material";
import { FormikProps } from "formik";
import { AppDispatch } from "../../redux/store";
import { fetchCities, clearCities } from "../../features/location/locationSlice";

interface Props {
  formik: FormikProps<any>;
  countries: string[];
  cities: string[];
  loading: boolean;
  dispatch: AppDispatch;
}

export default function PersonalDataStep({ formik, countries, cities, loading, dispatch }: Props) {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nombre Completo"
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '').toUpperCase();
          }}
          {...formik.getFieldProps("name")}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
      </Grid>
      <Grid item xs={6}>
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
              helperText={formik.touched.country && formik.errors.country}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
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
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Dirección de entrega"
          {...formik.getFieldProps("address")}
          error={formik.touched.address && !!formik.errors.address}
          helperText={formik.touched.address && formik.errors.address}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Correo electrónico"
          {...formik.getFieldProps("email")}
          error={formik.touched.email && !!formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          onInput={(e) => {
            const input = e.target as HTMLInputElement;
            input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
          }}
          label="Teléfono de contacto"
          {...formik.getFieldProps("phone")}
          error={formik.touched.phone && !!formik.errors.phone}
          helperText={formik.touched.phone && formik.errors.phone}
        />
      </Grid>
    </>
  );
} 