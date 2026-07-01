import { DEFAULT_TRIP, DEFAULT_LODGING, SPEND_CURRENCIES } from '../constants/defaults.js';
import { loadStoredObject } from '../services/storage.js';

export function loadTrip(key) {
  const stored = loadStoredObject(key);
  const days = Number(stored.days) >= 1 ? Math.min(60, Math.round(Number(stored.days))) : DEFAULT_TRIP.days;
  const nights = Number(stored.nights) >= 0 ? Math.min(60, Math.round(Number(stored.nights))) : DEFAULT_TRIP.nights;
  const isoRe = /^\d{4}-\d{2}-\d{2}$/;
  const startDate = isoRe.test(stored.startDate) ? stored.startDate : "";
  const endDate = isoRe.test(stored.endDate) ? stored.endDate : "";
  return { nights, days, startDate, endDate };
}

export function loadLodging(key, tripNights) {
  const stored = loadStoredObject(key);
  const currency = SPEND_CURRENCIES.includes(stored.currency) ? stored.currency : DEFAULT_LODGING.currency;
  return {
    nightly: Number(stored.nightly) >= 0 ? Number(stored.nightly) : DEFAULT_LODGING.nightly,
    currency,
    people: Number(stored.people) >= 1 ? Math.min(60, Math.round(Number(stored.people))) : DEFAULT_LODGING.people,
    nights: Number(stored.nights) >= 0 ? Math.min(60, Math.round(Number(stored.nights))) : tripNights,
    pay: stored.pay === "onsite" ? "onsite" : DEFAULT_LODGING.pay,
  };
}
