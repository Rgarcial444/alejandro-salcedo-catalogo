export const PHONE = "+52 55 4070 5962";
export const PHONE_TEL = "+5215540705962";
export const WHATSAPP_NUMBER = "5215540705962";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
