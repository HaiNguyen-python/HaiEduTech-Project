/**
 * @file currencyRates.ts
 * @description Static reference exchange rates for the pre-departure currency
 *   converter. Rounded and updated manually — for real transactions students
 *   must check their bank's live rates.
 */
export interface CurrencyRate {
  code: string;
  label: string;
  flag: string;
  /** How many VND for 1 unit of this currency. */
  vndPerUnit: number;
}

// Manual update date — surfaced in the UI.
export const CURRENCY_RATES_UPDATED = "2026-05-01";

export const CURRENCY_RATES: CurrencyRate[] = [
  { code: "USD", label: "US Dollar", flag: "🇺🇸", vndPerUnit: 25400 },
  { code: "EUR", label: "Euro", flag: "🇪🇺", vndPerUnit: 27600 },
  { code: "GBP", label: "British Pound", flag: "🇬🇧", vndPerUnit: 32200 },
  { code: "AUD", label: "Australian Dollar", flag: "🇦🇺", vndPerUnit: 16800 },
  { code: "SGD", label: "Singapore Dollar", flag: "🇸🇬", vndPerUnit: 18900 },
  { code: "CNY", label: "Chinese Yuan", flag: "🇨🇳", vndPerUnit: 3520 },
  { code: "JPY", label: "Japanese Yen", flag: "🇯🇵", vndPerUnit: 164 },
  { code: "KRW", label: "Korean Won", flag: "🇰🇷", vndPerUnit: 18.4 },
];
