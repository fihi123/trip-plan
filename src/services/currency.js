import { DEFAULT_RATES } from '../constants/defaults.js';
import { loadStoredObject } from './storage.js';

export function loadRates(key) {
  const stored = loadStoredObject(key);
  const phpToKrw = Number(stored.phpToKrw) > 0 ? Number(stored.phpToKrw) : DEFAULT_RATES.phpToKrw;
  const legacyPhpToUsd = Number(stored.phpToUsd);
  const phpPerUsd = Number(stored.phpPerUsd) > 0
    ? Number(stored.phpPerUsd)
    : (legacyPhpToUsd > 0 ? 1 / legacyPhpToUsd : DEFAULT_RATES.phpPerUsd);
  const krwPerUsd = Number(stored.krwPerUsd) > 0 ? Number(stored.krwPerUsd) : phpToKrw * phpPerUsd;
  return {
    phpToKrw,
    phpPerUsd,
    krwPerUsd,
    updatedAt: typeof stored.updatedAt === "string" ? stored.updatedAt : "",
  };
}

export function toPhp(amount, currency, rates) {
  const value = Number(amount || 0);
  if (currency === "PHP") return value;
  if (currency === "USD") return rates.phpPerUsd > 0 ? value * rates.phpPerUsd : 0;
  return rates.phpToKrw > 0 ? value / rates.phpToKrw : 0;
}

export async function fetchLiveRates() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  const phpPerUsd = data.rates.PHP;
  const krwPerUsd = data.rates.KRW;
  const phpToKrw = krwPerUsd / phpPerUsd;
  return {
    phpToKrw,
    phpPerUsd,
    krwPerUsd,
    updatedAt: new Date().toISOString()
  };
}
