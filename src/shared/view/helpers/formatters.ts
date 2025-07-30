import {
  Amount,
  IsoDateString,
  Timestamp,
} from "@/src/modules/payments/shared/domain/payment.types";

// TODO: use intl
export const formatAmount = (amount: Amount) => {
  return `${(amount / 100).toFixed(2)} €`;
};

// TODO: use intl
export const formatTimestamp = (timestamp: Timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// TODO: use intl
export const formatDate = (date: IsoDateString) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
