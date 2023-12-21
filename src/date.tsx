// We are rendering on the server, so standardize to one locale and options
const OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const LOCALE = "en-US";

export function renderDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, OPTIONS);
}
