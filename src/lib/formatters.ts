const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency", minimumFractionDigits: 0 });
const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short" });
const DATE_FORMATTER = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

// Format the price from cents to dollars using usd currency
export function formatCurrency(priceInCents: number) {
  return CURRENCY_FORMATTER.format(priceInCents / 100);
}

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}

export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date);
}

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}
