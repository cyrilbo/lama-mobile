import {
  Amount,
  IsoDateString,
  Timestamp,
} from "@/src/modules/payments/shared/domain/payment.types";
import { useLingui } from "@lingui/react";

export const useAmountFormatter = () => {
  const { i18n } = useLingui();
  return {
    formatAmount: (amount: Amount) =>
      i18n.number(amount / 100, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 2,
      }),
  };
};

export const useTimestampFormatter = () => {
  const { i18n } = useLingui();
  return {
    formatTimestamp: (timestamp: Timestamp) =>
      i18n.date(new Date(timestamp * 1000), {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  };
};

export const useDayFormatter = () => {
  const { i18n } = useLingui();
  return {
    formatDay: (date: IsoDateString) =>
      i18n.date(new Date(date), {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  };
};
