// TODO: use intl and branded type
export const formatAmount = (amount: number) => {
  return `${(amount / 100).toFixed(2)} €`;
};

// TODO: use intl and branded type
export const formatTimestamp = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// TODO: use intl and branded type
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
