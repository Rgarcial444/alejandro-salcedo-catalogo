export const PHONE = "+52 55 3181 8373";
export const PHONE_TEL = "+5215531818373";
export const WHATSAPP_NUMBER = "5215531818373";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const formatMXN = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
