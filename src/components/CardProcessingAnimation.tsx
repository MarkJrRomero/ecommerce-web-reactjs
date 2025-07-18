import { Box, Typography } from "@mui/material";
import type { CSSProperties } from "react";

const CardProcessingAnimation = ({brand}: {brand: string}) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={300}>
      <div className="card-animation-container" style={{ position: "relative" }}>
        <div className="dataphone">
          <div className="screen" />
          <div className="slot" />
          <div className="slot" />
          <div className="slot" />
        </div>
        <div className="credit-card" style={{ position: "absolute" }}>
          <img
            src={brand === "Visa" ? "/assets/images/cards/visa.webp" : "/assets/images/cards/mastercard.png"}
            alt={brand === "Visa" ? "Visa" : "Mastercard"}
            style={{ width: 40, position: "absolute" as CSSProperties["position"], bottom: 8, right: 10 }}
            draggable={false}
          />
        </div>
      </div>
      <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
        Procesando tu pago...
      </Typography>
    </Box>
  );
};

export default CardProcessingAnimation; 