const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" });
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

export function convertLocalDateToUTCIgnoringTimezone(locDate: Date) {
  const timestamp = Date.UTC(
    locDate.getFullYear(),
    locDate.getMonth(),
    locDate.getDate(),
    locDate.getHours(),
    locDate.getMinutes(),
    locDate.getSeconds(),
    locDate.getMilliseconds(),
  );

  return new Date(timestamp);
}

export function convertUTCToLocalDateIgnoringTimezone(utcDate: Date) {
  return new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds(),
    utcDate.getUTCMilliseconds(),
  );
}
