export const DEFAULT_RATES = { phpToKrw: 26.675, phpPerUsd: 56.497, krwPerUsd: 1507.06, updatedAt: "" };

export const BASE_EVENTS = [
  { day: 1, name: "인천-클락", budget: 0, start: "21:00", end: "01:00" },
  { day: 1, name: "호텔", budget: 0, start: "01:00", end: "02:00" },
  { day: 1, name: "클럽 or 술집", budget: 10000, start: "02:00", end: "06:00" },
  { day: 1, name: "호텔", budget: 0, start: "06:00", end: "10:00" },
  { day: 1, name: "미스진 (순대국)", budget: 600, start: "10:00", end: "11:00" },
  { day: 1, name: "마사지 (1H)", budget: 600, start: "11:00", end: "12:00" },
  { day: 1, name: "레드스트리트", budget: 8000, start: "13:00", end: "14:00" },
  { day: 1, name: "주몽", budget: 2000, start: "14:00", end: "16:00" },
  { day: 1, name: "호텔", budget: 0 },
  { day: 1, name: "아지트 (코끼리조개, 해물찜)", budget: 3000, start: "19:00", end: "21:00" },
  { day: 1, name: "호텔", budget: 0 },
  { day: 2, name: "미스진 (순대국)", budget: 500, start: "10:00", end: "11:00" },
  { day: 2, name: "마사지 (1H)", budget: 600, start: "11:00", end: "12:00" },
  { day: 2, name: "레드스트리트", budget: 8000, start: "12:00", end: "13:00" },
  { day: 2, name: "호텔 식당", budget: 2000, start: "13:00", end: "14:00" },
  { day: 2, name: "호텔", budget: 0 },
  { day: 2, name: "킴스브라더 (A세트, 짜파)", budget: 2000, start: "19:00", end: "21:00" },
  { day: 2, name: "호텔", budget: 0 },
  { day: 2, name: "R&B or 노래방", budget: 2000 },
  { day: 3, name: "빨래", budget: 300 },
  { day: 3, name: "양평해장국", budget: 500, start: "10:00", end: "11:00" },
  { day: 3, name: "마사지 (1H)", budget: 600, start: "11:00", end: "12:00" },
  { day: 3, name: "레드스트리트", budget: 8000, start: "12:00", end: "13:00" },
  { day: 3, name: "서울옥", budget: 2000, start: "13:00", end: "15:00" },
  { day: 3, name: "호텔", budget: 0 },
  { day: 3, name: "crabs and crack", budget: 1500, start: "19:00", end: "21:00" },
  { day: 3, name: "호텔", budget: 0 },
  { day: 3, name: "호텔 라운지", budget: 2000 },
  { day: 4, name: "호텔 식당", budget: 500, start: "10:00", end: "11:00" },
  { day: 4, name: "마사지 (1H)", budget: 600, start: "11:00", end: "12:00" },
  { day: 4, name: "레드스트리트", budget: 8000, start: "12:00", end: "13:00" },
  { day: 4, name: "호텔 --> SM", budget: 0, start: "15:30", end: "16:00" },
  { day: 4, name: "SM --> 공항", budget: 0, start: "16:00", end: "18:00" },
  { day: 4, name: "체크인", budget: 0, start: "18:00", end: "19:35" },
  { day: 4, name: "인천", budget: 0, start: "19:35", end: "00:45" },
  { day: 4, name: "인천 --> 화성", budget: 0, start: "02:00", end: "03:00" },
];

export const DEFAULT_TRIP = { nights: 3, days: 4 };
export const DEFAULT_LODGING = { nightly: 0, currency: "PHP", people: 4, nights: DEFAULT_TRIP.nights, pay: "prepaid" };
export const SPEND_CURRENCIES = ["KRW", "PHP", "USD"];

export const STORAGE_KEYS = {
  EVENTS: "clark-events-v1",
  MEMO_HTML: "clark-memo-html-v2",
  GOLF: "clark-golf-v1",
  TRIP: "clark-trip-v1",
  RATES: "clark-rates-v1",
  EXTRA_SPEND: "clark-extra-spend-v1",
  LODGING: "clark-lodging-v1",
  SEEDED: "clark-seeded-v1",
  SAVED_TRIPS: "clark-saved-trips-v1",
  CLOUD_GROUP: "clark-cloud-group-v1"
};

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD1WOBbHn6HHBg-eKvy-lVjDSTHZwkgBus",
  authDomain: "trip-plan-4b079.firebaseapp.com",
  projectId: "trip-plan-4b079",
  storageBucket: "trip-plan-4b079.firebasestorage.app",
  messagingSenderId: "700766072620",
  appId: "1:700766072620:web:b91b33d5756cbe1bde8689",
  measurementId: "G-9QWWP9JBSL",
};

export const FIRESTORE_ROOT = "trip_groups";
export const FIRESTORE_COLLECTION = "saved_trips";

export const EVENT_CATEGORIES = ["식비", "숙소", "교통", "마사지", "쇼핑", "밤일정", "골프", "기타"];
export const DOW_KR = ["일", "월", "화", "수", "목", "금", "토"];
