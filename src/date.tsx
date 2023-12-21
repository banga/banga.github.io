// We are rendering on the server, so standardize to one locale and options
// Timezone should be set to UTC (via TZ=UTC)
const OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
const LOCALE = "en-US";

export function renderDate(date: Date): string {
  return date.toLocaleDateString(LOCALE, OPTIONS);
}
