export const formatPrice = (price: number) => {
  return price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const enforceNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

export const enforceText = (value: string) => {
  return value.replace(/[^a-zA-Z\s]/g, "");
};

export const enforceDateExpiration = (value: string) => {
  return value.replace(/[^0-9\/]/g, "");
};