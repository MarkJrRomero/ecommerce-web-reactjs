import { Box, Paper, Divider, Avatar, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FormikProps } from "formik";

interface Props {
  formik: FormikProps<any>;
  selectedProduct: any;
  formatPrice: (n: number) => string;
}

export default function SummaryStep({ formik, selectedProduct, formatPrice }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          maxWidth: 480,
          width: "100%",
          m: 3,
          background: "linear-gradient(135deg, #f5f7fa 0%, #e2eafc 100%)",
          transition: "box-shadow 0.3s",
          boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.22)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CheckCircleIcon color="success" sx={{ fontSize: 48, mb: 1 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              textAlign: "center",
              letterSpacing: 1,
              color: "primary.main",
            }}
          >
            Resumen de la compra
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(25, 118, 210, 0.07)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
            <CreditCardIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Producto
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {selectedProduct?.name}
            </Typography>
            <Typography variant="body1" color="success.main" sx={{ fontWeight: 900 }}>
              {formatPrice(Number(selectedProduct?.price))}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(76, 175, 80, 0.07)",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
            Datos personales
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PersonIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Nombre:</b> {formik.values.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <EmailIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Correo electrónico:</b> {formik.values.email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PhoneIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Teléfono:</b> {formik.values.phone}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <HomeIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Dirección:</b> {formik.values.address}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <PublicIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>País:</b> {formik.values.country}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocationCityIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Ciudad:</b> {formik.values.city}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(255, 193, 7, 0.07)",
          }}
        >
          <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
            Tarjeta
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CreditCardIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Número:</b> **** **** **** {formik.values.cardNumber.slice(-4)}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CreditCardIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Titular:</b> {formik.values.cardHolder}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CreditCardIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              <b>Expiración:</b> {formik.values.expiration}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
} 