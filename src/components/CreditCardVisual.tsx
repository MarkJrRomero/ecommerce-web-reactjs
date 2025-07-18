import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

type Props = {
  cardNumber: string;
  cardHolder: string;
  expiration: string;
  cvc: string;
  isFlipped: boolean;
};

function getCardType(number: string) {
  if (/^4/.test(number)) return "visa";
  if (/^5[1-5]/.test(number)) return "mastercard";
  return "default";
}

export default function CreditCardVisual({
  cardNumber,
  cardHolder,
  expiration,
  cvc,
  isFlipped,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Tamaños responsivos
  const cardWidth = isMobile ? 280 : 340;
  const cardHeight = isMobile ? 170 : 210;
  const fontSize = isMobile ? "1.1rem" : "1.4rem";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "visible",
        minHeight: cardHeight + 16,
      }}
    >
      <Box
        sx={{
          perspective: "1000px",
          width: cardWidth,
          height: cardHeight,
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: isFlipped ? "rotateY(180deg)" : "none",
          }}
        >
          {/* Cara frontal */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg, #1976d2 60%, #1565c0 100%)",
              borderRadius: 4,
              boxShadow: 3,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
              <Typography variant={isMobile ? "body1" : "h6"} fontWeight={600} sx={{ position: "relative" }}>
                {getCardType(cardNumber) === "default" && "TARJETA"}
                {getCardType(cardNumber) === "visa" && <Box component="img" src="/assets/images/cards/visa.webp" alt="Visa" sx={{ width: 55, height: 20, position: "absolute", top: 0, left: 0}} />}
                {getCardType(cardNumber) === "mastercard" && <Box component="img" src="/assets/images/cards/mastercard.png" alt="Mastercard" sx={{ width: 55, height: 30, position: "absolute", top: 0, left: 0}} 
                />}
              </Typography>
            </Box>
            <Typography
              sx={{
                letterSpacing: 2,
                mt: 2,
                mb: 0,
                paddingLeft: 2,
                paddingRight:  2,
                fontFamily: "monospace",
                textAlign: "center",
                fontSize: fontSize,
                wordBreak: "break-all",
              }}
            >
              {cardNumber.replace(/(.{4})/g, "$1 ").trim() || "•••• •••• •••• ••••"}
            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end" sx={{ p: 2 }}>
              <Box>
                <Typography variant="caption">TITULAR</Typography>
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: isMobile ? "0.85rem" : "1rem" }}>
                  {cardHolder || "NOMBRE Y APELLIDO"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">EXPIRA</Typography>
                <Typography variant="body2" fontWeight={500} sx={{ fontSize: isMobile ? "0.85rem" : "1rem" }}>
                  {expiration || "MM/AA"}
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* Cara trasera */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg, #263238 60%, #37474f 100%)",
              borderRadius: 4,
              boxShadow: 3,
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              transform: "rotateY(180deg)",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: isMobile ? 22 : 32,
                background: "#000",
                mb: 2,
                borderRadius: 1,
              }}
            />
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <Box
                sx={{
                  background: "#fff",
                  color: "#000",
                  p: 1,
                  m: 1,
                  borderRadius: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: isMobile ? 15 : 18,
                  minWidth: isMobile ? 40 : 60,
                  textAlign: "center",
                }}
              >
                {cvc || "•••"}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}