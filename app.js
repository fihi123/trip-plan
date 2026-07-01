// === 환율 (원·달러·페소 모두 표기) ===
// phpToKrw: 1페소당 원화, phpPerUsd: 1달러당 페소, krwPerUsd: 1달러당 원화.
// 지출 탭에서 직접 입력하거나 자동 갱신.
const defaultRates = { phpToKrw: 26.675, phpPerUsd: 56.497, krwPerUsd: 1507.06, updatedAt: "" };

const baseEvents = [
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

const defaultTrip = { nights: 3, days: 4 };
const defaultLodging = { nightly: 0, currency: "PHP", people: 4, nights: defaultTrip.nights };
const spendCurrencies = ["KRW", "PHP", "USD"];

// ⛳ 골프 비용 데이터 (clark_golf_calculator.xlsx DATA 시트에서 이전)
// cart2/cart3/cart4 = 인원수(2/3/4)에 따른 1인당 카트 비용, extra = 보험+컨슈머블
const golfCourses = [
  { id: "SunValley_General", name: "썬밸리(일반)", season: "4.1~", weekday: 3000, weekend: 3500, caddy: 700, cart2: 750, cart3: 1000, cart4: 750, extra: 150 },
  { id: "SunValley_Member", name: "썬밸리(멤버)", season: "4.1~", weekday: 3300, weekend: 3800, caddy: 700, cart2: 750, cart3: 1000, cart4: 750, extra: 150 },
  { id: "Korea", name: "코리아", season: "3.9~", weekday: 1800, weekend: 2400, caddy: 600, cart2: 1000, cart3: 1333, cart4: 1000, extra: 150 },
  { id: "Mimosa", name: "미모사", season: "~3.31", weekday: 4500, weekend: 5500, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, extra: 400 },
  { id: "Royal", name: "로얄", season: "3.16~", weekday: 1800, weekend: 2300, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, extra: 450 },
  { id: "HanReserve", name: "한리저브", season: "1.10~4.30", weekday: 12500, weekend: 12500, caddy: 0, cart2: 0, cart3: 0, cart4: 0, extra: 0 },
  { id: "Pradera_May", name: "프라데라", season: "5.1~", weekday: 2700, weekend: 2700, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, extra: 450 },
  { id: "Pradera_Apr", name: "프라데라", season: "4월프로모", weekday: 1500, weekend: 1500, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, extra: 450 },
  { id: "Luisita", name: "루이시타", season: "3.16~", weekday: 2000, weekend: 2000, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, extra: 400 },
  { id: "Beverly", name: "베버리", season: "3.16~", weekday: 1400, weekend: 1700, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, extra: 500 },
  { id: "NewAsia", name: "뉴아시아", season: "3.16~", weekday: 1200, weekend: 1200, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, extra: 150 },
  { id: "Lakewood", name: "레이크우드", season: "3.16~", weekday: 1000, weekend: 1000, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, extra: 0 },
  { id: "Subic", name: "수빅CC", season: "~3.31", weekday: 6800, weekend: 10800, caddy: 0, cart2: 0, cart3: 0, cart4: 0, extra: 0 },
];

// 요금표에서 수정 가능한 숫자 필드 (인원별 카트는 현재 선택 인원에 해당하는 키로 매핑)
const golfNumberFields = ["weekday", "weekend", "caddy", "cart2", "cart3", "cart4", "extra"];

const defaultGolf = {
  people: 4,
  // day = 주중/주말, tripDay = 며칠차 일정에 넣을지, time = 티오프 시간
  rounds: [
    { id: "round-1", course: "Luisita", day: "주말", tripDay: 2, time: "06:30" },
    { id: "round-2", course: "Pradera_May", day: "주말", tripDay: 3, time: "06:30" },
    { id: "round-3", course: "Korea", day: "주중", tripDay: 4, time: "12:00" },
  ],
};

const eventStorageKey = "clark-events-v1";
const memoHtmlStorageKey = "clark-memo-html-v2"; // v2: 메모 기본값을 빈 내용으로 초기화
const golfStorageKey = "clark-golf-v1";
const tripStorageKey = "clark-trip-v1";
const ratesStorageKey = "clark-rates-v1";
const extraSpendStorageKey = "clark-extra-spend-v1";
const lodgingStorageKey = "clark-lodging-v1";
const seededKey = "clark-seeded-v1";
// 저장된 일정 목록(스냅샷)을 담는 로컬 키 — 클라우드 미설정 시 폴백 저장소
const savedTripsKey = "clark-saved-trips-v1";
const cloudGroupKey = "clark-cloud-group-v1";

// === 클라우드 저장소(Firebase Firestore) 설정 ===
// 아래 firebaseConfig를 채우면 저장본이 클라우드 DB에 저장돼 어느 기기에서나 같은 목록을
// 보고 동행자와 공유할 수 있습니다. 비워 두면 자동으로 이 브라우저 로컬 저장으로 동작합니다.
// 설정 방법은 클라우드설정.md 참고. (빌드/SDK 없이 Firestore REST API를 직접 호출합니다.)
const firebaseConfig = {
  apiKey: "AIzaSyD1WOBbHn6HHBg-eKvy-lVjDSTHZwkgBus",
  authDomain: "trip-plan-4b079.firebaseapp.com",
  projectId: "trip-plan-4b079",
  storageBucket: "trip-plan-4b079.firebasestorage.app",
  messagingSenderId: "700766072620",
  appId: "1:700766072620:web:b91b33d5756cbe1bde8689",
  measurementId: "G-9QWWP9JBSL",
};
const FIRESTORE_ROOT = "trip_groups";
const FIRESTORE_COLLECTION = "saved_trips";
let cloudGroup = loadStoredObject(cloudGroupKey);
const cloudOn = () => Boolean(firebaseConfig.projectId && firebaseConfig.apiKey && cloudGroup.id);
const firestoreBase = () =>
  `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

const backupKeys = [eventStorageKey, memoHtmlStorageKey, golfStorageKey, tripStorageKey, ratesStorageKey, extraSpendStorageKey, lodgingStorageKey];
const jsonBackupKeys = backupKeys.filter((key) => key !== memoHtmlStorageKey);

// 시드 완료 표시가 있으면 비어 있어도 기본 일정을 다시 만들지 않는다(완전 초기화 후 빈 상태 유지).
const seeded = localStorage.getItem(seededKey) === "done";

const state = {
  day: "1",
  view: location.hash === "#spend" ? "spend" : location.hash === "#golf" ? "golf" : location.hash === "#notes" ? "notes" : "guide",
};

let events = loadStoredArray(eventStorageKey);
if (!events.length && !seeded) events = baseEvents.map((event, index) => ({ ...event, id: `event-${index + 1}` }));
let memoHtml = localStorage.getItem(memoHtmlStorageKey) || "";
let trip = loadTrip();
let golf = loadGolf();
let rates = loadRates();
let extraSpends = loadStoredArray(extraSpendStorageKey);
let lodging = loadLodging();

// 최초 실행(시드 전)에만 기본 일정/골프를 저장해 두고, 이후에는 빈 상태가 기본이 되도록 표시한다.
if (!seeded) {
  localStorage.setItem(eventStorageKey, JSON.stringify(events));
  localStorage.setItem(golfStorageKey, JSON.stringify(golf));
  localStorage.setItem(lodgingStorageKey, JSON.stringify(lodging));
  localStorage.setItem(seededKey, "done");
}

// === 저장값 로더 ===
function loadStoredObject(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

function loadStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function loadTrip() {
  const stored = loadStoredObject(tripStorageKey);
  const days = Number(stored.days) >= 1 ? Math.min(60, Math.round(Number(stored.days))) : defaultTrip.days;
  const nights = Number(stored.nights) >= 0 ? Math.min(60, Math.round(Number(stored.nights))) : defaultTrip.nights;
  const isoRe = /^\d{4}-\d{2}-\d{2}$/;
  const startDate = isoRe.test(stored.startDate) ? stored.startDate : "";
  const endDate = isoRe.test(stored.endDate) ? stored.endDate : "";
  return { nights, days, startDate, endDate };
}

function loadLodging() {
  const stored = loadStoredObject(lodgingStorageKey);
  const currency = spendCurrencies.includes(stored.currency) ? stored.currency : defaultLodging.currency;
  return {
    nightly: Number(stored.nightly) >= 0 ? Number(stored.nightly) : defaultLodging.nightly,
    currency,
    people: Number(stored.people) >= 1 ? Math.min(60, Math.round(Number(stored.people))) : defaultLodging.people,
    nights: Number(stored.nights) >= 0 ? Math.min(60, Math.round(Number(stored.nights))) : trip.nights,
  };
}

function loadGolf() {
  const stored = loadStoredObject(golfStorageKey);
  const people = [2, 3, 4].includes(Number(stored.people)) ? Number(stored.people) : defaultGolf.people;
  const hasStoredRounds = Array.isArray(stored.rounds) && stored.rounds.length;
  const rounds = hasStoredRounds
    ? stored.rounds.map((round, index) => ({
        id: round.id || `round-${index + 1}`,
        course: golfCourses.some((course) => course.id === round.course) ? round.course : golfCourses[0].id,
        day: round.day === "주중" ? "주중" : "주말",
        tripDay: Number(round.tripDay) >= 1 ? Math.round(Number(round.tripDay)) : 1,
        time: typeof round.time === "string" ? round.time : "",
      }))
    : (seeded ? [] : defaultGolf.rounds.map((round) => ({ ...round })));
  // 요금표 수정값: { 골프장id: { name?, weekday?, ... } } 형태만 받아들인다.
  const courseEdits = {};
  const storedEdits = stored.courseEdits && typeof stored.courseEdits === "object" ? stored.courseEdits : {};
  golfCourses.forEach((course) => {
    const edit = storedEdits[course.id];
    if (!edit || typeof edit !== "object") return;
    const clean = {};
    if (typeof edit.name === "string") clean.name = edit.name;
    golfNumberFields.forEach((field) => {
      if (edit[field] != null && Number.isFinite(Number(edit[field]))) clean[field] = Number(edit[field]);
    });
    if (Object.keys(clean).length) courseEdits[course.id] = clean;
  });
  return { people, rounds, courseEdits };
}

function loadRates() {
  const stored = loadStoredObject(ratesStorageKey);
  const phpToKrw = Number(stored.phpToKrw) > 0 ? Number(stored.phpToKrw) : defaultRates.phpToKrw;
  const legacyPhpToUsd = Number(stored.phpToUsd);
  const phpPerUsd = Number(stored.phpPerUsd) > 0
    ? Number(stored.phpPerUsd)
    : (legacyPhpToUsd > 0 ? 1 / legacyPhpToUsd : defaultRates.phpPerUsd);
  const krwPerUsd = Number(stored.krwPerUsd) > 0 ? Number(stored.krwPerUsd) : phpToKrw * phpPerUsd;
  return {
    phpToKrw,
    phpPerUsd,
    krwPerUsd,
    updatedAt: typeof stored.updatedAt === "string" ? stored.updatedAt : "",
  };
}

// === 날짜 유틸 ===
const DOW_KR = ["일", "월", "화", "수", "목", "금", "토"];

function isoAddDays(iso, n) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + n);
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function isoToMD(iso) {
  const [, m, d] = iso.split("-");
  return `${Number(m)}/${Number(d)}`;
}

function isoDowKr(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return DOW_KR[new Date(y, m - 1, d).getDay()];
}

function isoDiffDays(a, b) {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((new Date(by, bm - 1, bd) - new Date(ay, am - 1, ad)) / 86400000);
}

// === DOM 참조 ===
const timeline = document.querySelector("#timeline");
const daySegments = document.querySelector("#daySegments");
const visibleCount = document.querySelector("#visibleCount");
const addEventButton = document.querySelector("#addEventButton");
const copyDayButton = document.querySelector("#copyDayButton");
const pasteDayButton = document.querySelector("#pasteDayButton");
const tripNights = document.querySelector("#tripNights");
const tripDays = document.querySelector("#tripDays");
const tripDates = document.querySelector("#tripDates");
const importPdfButton = document.querySelector("#importPdfButton");
const pdfInput = document.querySelector("#pdfInput");
const exportScheduleButton = document.querySelector("#exportScheduleButton");
const importScheduleButton = document.querySelector("#importScheduleButton");
const scheduleExcelInput = document.querySelector("#scheduleExcelInput");
const memoField = document.querySelector("#memoNotes");
const ratePhpKrw = document.querySelector("#ratePhpKrw");
const rateKrwUsd = document.querySelector("#rateKrwUsd");
const ratePhpUsd = document.querySelector("#ratePhpUsd");
const fetchRatesButton = document.querySelector("#fetchRatesButton");
const ratesUpdated = document.querySelector("#ratesUpdated");
const spendSummary = document.querySelector("#spendSummary");
const spendBreakdown = document.querySelector("#spendBreakdown");
const extraSpendList = document.querySelector("#extraSpendList");
const addSpendButton = document.querySelector("#addSpendButton");
const exportSpendButton = document.querySelector("#exportSpendButton");
const importSpendButton = document.querySelector("#importSpendButton");
const spendExcelInput = document.querySelector("#spendExcelInput");
const lodgingNightly = document.querySelector("#lodgingNightly");
const lodgingCurrency = document.querySelector("#lodgingCurrency");
const lodgingPeople = document.querySelector("#lodgingPeople");
const lodgingNights = document.querySelector("#lodgingNights");
const lodgingSummary = document.querySelector("#lodgingSummary");
const golfPeople = document.querySelector("#golfPeople");
const golfRounds = document.querySelector("#golfRounds");
const golfSummary = document.querySelector("#golfSummary");
const golfRefTable = document.querySelector("#golfRefTable");
const addRoundButton = document.querySelector("#addRoundButton");
const saveTripButton = document.querySelector("#saveTripButton");
const openSavedButton = document.querySelector("#openSavedButton");
const savedDialog = document.querySelector("#savedDialog");
const savedList = document.querySelector("#savedList");
const closeSavedButton = document.querySelector("#closeSavedButton");
const cloudStatus = document.querySelector("#cloudStatus");
const setCloudCodeButton = document.querySelector("#setCloudCodeButton");
const clearCloudCodeButton = document.querySelector("#clearCloudCodeButton");
const resetButton = document.querySelector("#resetButton");
const pdfButton = document.querySelector("#pdfButton");
const exportBackupButton = document.querySelector("#exportBackupButton");
const importBackupButton = document.querySelector("#importBackupButton");
const backupInput = document.querySelector("#backupInput");

// === 금액 표기 (페소·원·달러) ===
function phpText(value) {
  return `₱${Math.round(value).toLocaleString("ko-KR")}`;
}

function krwText(value) {
  return `₩${Math.round(value * rates.phpToKrw).toLocaleString("ko-KR")}`;
}

function usdText(value) {
  const usd = rates.phpPerUsd > 0 ? value / rates.phpPerUsd : 0;
  return `$${usd.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function html(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function saveEvents() {
  localStorage.setItem(eventStorageKey, JSON.stringify(events));
}

function saveTrip() {
  localStorage.setItem(tripStorageKey, JSON.stringify(trip));
}

function saveGolf() {
  localStorage.setItem(golfStorageKey, JSON.stringify(golf));
}

function saveRates() {
  localStorage.setItem(ratesStorageKey, JSON.stringify(rates));
}

function saveExtraSpends() {
  localStorage.setItem(extraSpendStorageKey, JSON.stringify(extraSpends));
}

function saveLodging() {
  localStorage.setItem(lodgingStorageKey, JSON.stringify(lodging));
}

function spendCurrencyOf(item) {
  return spendCurrencies.includes(item.currency) ? item.currency : "KRW";
}

// 결제 구분: prepaid(선결제) / onsite(현지결제, 환전 대상). 미지정 항목은 기존 동작대로 선결제.
function spendPaymentOf(item) {
  return item.pay === "onsite" ? "onsite" : "prepaid";
}

function toPhp(amount, currency) {
  const value = Number(amount || 0);
  if (currency === "PHP") return value;
  if (currency === "USD") return rates.phpPerUsd > 0 ? value * rates.phpPerUsd : 0;
  return rates.phpToKrw > 0 ? value / rates.phpToKrw : 0;
}

function lodgingBreakdown() {
  const nightly = Math.max(0, Number(lodging.nightly) || 0);
  const people = Math.max(1, Math.round(Number(lodging.people) || 1));
  const nights = Math.max(0, Math.round(Number(lodging.nights) || 0));
  const currency = spendCurrencies.includes(lodging.currency) ? lodging.currency : defaultLodging.currency;
  const groupTotalOriginal = nightly * nights;
  const perPersonNightOriginal = nightly / people;
  const perPersonTotalOriginal = perPersonNightOriginal * nights;
  const perPersonTotalPhp = toPhp(perPersonTotalOriginal, currency);
  const groupTotalPhp = toPhp(groupTotalOriginal, currency);
  return {
    nightly,
    people,
    nights,
    currency,
    groupTotalOriginal,
    perPersonNightOriginal,
    perPersonTotalOriginal,
    perPersonTotalPhp,
    groupTotalPhp,
  };
}

function originalMoneyText(value, currency) {
  if (currency === "PHP") return `₱${Math.round(value).toLocaleString("ko-KR")}`;
  if (currency === "USD") return `$${Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  return `₩${Math.round(value).toLocaleString("ko-KR")}`;
}

function saveMemo() {
  try {
    localStorage.setItem(memoHtmlStorageKey, memoHtml);
  } catch (error) {
    alert("메모를 저장할 공간이 부족합니다. 이미지를 줄이거나 삭제한 뒤 다시 시도해 주세요.");
  }
}

function nextId(prefix, collection) {
  return `${prefix}-${Date.now()}-${collection.length + 1}`;
}

function loadScript(src, isReady) {
  return new Promise((resolve, reject) => {
    if (isReady()) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => isReady() ? resolve() : reject(new Error(src));
    script.onerror = () => reject(new Error(src));
    document.head.appendChild(script);
  });
}

async function loadFirstAvailable(sources, isReady) {
  let lastError;
  for (const src of sources) {
    try {
      await loadScript(src, isReady);
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("script");
}

// === 지출 카테고리 ===
const eventCategories = ["식비", "숙소", "교통", "마사지", "쇼핑", "밤일정", "골프", "기타"];

function inferCategory(event) {
  const text = String(event.name || "");
  if (/마사지/.test(text)) return "마사지";
  if (eventKind(event) === "night") return "밤일정";
  if (eventKind(event) === "food") return "식비";
  if (/SM|쇼핑|마트|싱싱|면세/.test(text)) return "쇼핑";
  if (/호텔|숙소|빌라|체크인/.test(text)) return "숙소";
  if (/공항|인천|클락|화성|이동|-->|→/.test(text)) return "교통";
  return "기타";
}

function eventCategory(event) {
  return eventCategories.includes(event.category) ? event.category : inferCategory(event);
}

// 분류 표시용 라벨 — "기타"이고 직접 입력값이 있으면 그 텍스트를 쓴다.
function eventCategoryLabel(event) {
  const category = eventCategory(event);
  const custom = String(event.categoryCustom || "").trim();
  return category === "기타" && custom ? custom : category;
}

// === 일정(타임라인) ===
function eventKind(event) {
  const text = String(event.name || "").toLowerCase();
  if (text.includes("술") || text.includes("클럽") || text.includes("노래방") || text.includes("레드스트리트")) return "night";
  if (text.includes("식당") || text.includes("순대국") || text.includes("해장국") || text.includes("주몽") || text.includes("서울옥") || text.includes("crabs") || text.includes("아지트") || text.includes("킴스")) return "food";
  return "default";
}

function eventKindLabel(event) {
  const kind = eventKind(event);
  if (kind === "night") return "밤 일정";
  if (kind === "food") return "식사";
  return "일정";
}

function startMinutes(event) {
  if (!event.start) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(event.start).trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

// 시작 시간 순으로 정렬하되, 밤을 넘기는 일정(예: 21:00 출발 → 다음날 새벽)이
// 깨지지 않도록 그날 첫 시간을 기준점으로 삼아 그보다 이른 시간은 다음날로 본다.
function sortDayEvents(items) {
  let anchor = null;
  for (const event of items) {
    const minutes = startMinutes(event);
    if (minutes != null) {
      anchor = minutes;
      break;
    }
  }
  let lastKey = -1;
  return items
    .map((event, index) => {
      const minutes = startMinutes(event);
      let key;
      if (minutes == null) {
        key = event.isNew ? Number.NEGATIVE_INFINITY : lastKey;
      } else {
        key = anchor != null && minutes < anchor ? minutes + 1440 : minutes;
        lastKey = key;
      }
      return { event, key, index };
    })
    .sort((a, b) => a.key - b.key || a.index - b.index)
    .map((entry) => entry.event);
}

// 선택한 하루의 일정만 보여준다 (전체 보기 없음).
function renderTimeline() {
  const items = sortDayEvents(events.filter((event) => String(event.day) === state.day));
  timeline.innerHTML = "";

  if (trip.startDate) {
    const iso = isoAddDays(trip.startDate, Number(state.day) - 1);
    const head = document.createElement("div");
    head.className = "day-date";
    head.textContent = `${state.day}일차 · ${isoToMD(iso)} (${isoDowKr(iso)})`;
    timeline.append(head);
  }

  items.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.kind = eventKind(event);
    card.dataset.eventId = event.id;
    const category = eventCategory(event);
    const categoryOptions = eventCategories.map((name) =>
      `<option value="${name}" ${name === category ? "selected" : ""}>${name}</option>`
    ).join("");
    const isCustom = category === "기타";
    card.innerHTML = `
      <div class="event-main">
        <div class="event-editor">
          <label class="inline-field event-name-input">
            <span>장소 / 내용</span>
            <input data-event-field="name" aria-label="일정명" value="${html(event.name)}" />
          </label>
          <label class="inline-field event-time">
            <span>시작</span>
            <input data-event-field="start" aria-label="시작 시간" placeholder="10:00" value="${html(event.start || "")}" />
          </label>
          <label class="inline-field event-time">
            <span>종료</span>
            <input data-event-field="end" aria-label="종료 시간" placeholder="11:00" value="${html(event.end || "")}" />
          </label>
          <label class="inline-field event-cat">
            <span>분류</span>
            <select data-event-field="category" aria-label="분류">${categoryOptions}</select>
          </label>
          ${isCustom ? `
          <label class="inline-field event-cat-custom">
            <span>기타 분류</span>
            <input data-event-field="categoryCustom" aria-label="기타 분류" placeholder="직접 입력" value="${html(event.categoryCustom || "")}" />
          </label>` : ""}
        </div>
      </div>
      <label class="inline-field money-field">
        <span>예산(₱)</span>
        <input class="budget-edit" data-event-field="budget" inputmode="numeric" aria-label="예산" value="${html(event.budget || "")}" />
      </label>
      <button class="delete-inline delete-event" type="button" aria-label="일정 삭제">×</button>
    `;
    timeline.append(card);
  });

  // 해당 일차에 배정된 골프 라운드를 자동으로 표시 (편집은 골프 탭에서)
  const golfForDay = golf.rounds.filter((round) => Number(round.tripDay) === Number(state.day));
  golfForDay.forEach((round) => {
    const breakdown = golfRoundBreakdown(round, golf.people);
    const card = document.createElement("article");
    card.className = "event-card golf-event";
    card.dataset.kind = "golf";
    card.innerHTML = `
      <div class="event-main">
        <div class="golf-event__title">⛳ 골프 · ${html(breakdown.course.name)} <small>${html(round.day)}${round.time ? ` · ${html(round.time)}` : ""}</small></div>
        <div class="meta">골프 · 1인 ${krwText(breakdown.total)} · ${usdText(breakdown.total)} · <button class="link-button" type="button" data-goto="golf">골프 탭에서 편집</button></div>
      </div>
      <div class="money-field golf-event__cost">${phpText(breakdown.total)}</div>
    `;
    timeline.append(card);
  });

  if (!items.length && !golfForDay.length) {
    const empty = document.createElement("p");
    empty.className = "meta";
    empty.textContent = `${state.day}일차 일정이 없습니다. "추가"로 일정을 넣어 보세요.`;
    timeline.append(empty);
  }
  visibleCount.value = `${items.length + golfForDay.length}개 항목`;
}

function renderDaySegments() {
  if (Number(state.day) > trip.days) state.day = String(trip.days);
  let buttons = "";
  for (let day = 1; day <= trip.days; day += 1) {
    buttons += `<button class="segment ${String(day) === state.day ? "is-active" : ""}" type="button" data-day="${day}">${day}일차</button>`;
  }
  daySegments.innerHTML = buttons;
}

function renderTrip() {
  if (document.activeElement !== tripNights) tripNights.value = String(trip.nights);
  if (document.activeElement !== tripDays) tripDays.value = String(trip.days);
  const lodgingText = lodging.nights !== trip.nights ? ` · 숙박 ${lodging.nights}박` : "";
  tripDates.textContent = trip.startDate
    ? `✈️ ${trip.startDate}(${isoDowKr(trip.startDate)}) 출국 ~ ${trip.endDate}(${isoDowKr(trip.endDate)}) 귀국 · ${trip.nights}박 ${trip.days}일${lodgingText}`
    : "";
  renderDaySegments();
}

// === 지출 내역 (페소·원·달러) — 일정 항목 + 골프(1인 기준)를 합산 ===
// 골프 비용은 1인 합계를 해당 라운드의 일정 일차에 배정한다.
function spendItems() {
  const fromEvents = events.map((event) => ({
    name: event.name || "(이름 없음)",
    day: Number(event.day) || 0,
    category: eventCategoryLabel(event),
    amount: Number(event.budget || 0),
  }));
  const fromGolf = golf.rounds.map((round) => {
    const breakdown = golfRoundBreakdown(round, golf.people);
    return {
      name: `⛳ ${breakdown.course.name} (${round.day}${round.time ? ` ${round.time}` : ""})`,
      day: Number(round.tripDay) || 0,
      category: "골프",
      amount: breakdown.total,
    };
  });
  const fromExtra = extraSpends.map((item) => ({
    name: item.name || "(선결제)",
    day: 0,
    category: eventCategories.includes(item.category) ? item.category : "기타",
    amount: toPhp(item.amount, spendCurrencyOf(item)),
    prepaid: spendPaymentOf(item) === "prepaid", // 선결제만 환전 금액에서 제외
  }));
  const lodgingCost = lodgingBreakdown();
  const fromLodging = lodgingCost.perPersonTotalPhp > 0
    ? [{
        name: `🏨 숙박 (${lodgingCost.nights}박, ${lodgingCost.people}명)`,
        day: 0,
        category: "숙소",
        amount: lodgingCost.perPersonTotalPhp,
      }]
    : [];
  return [...fromEvents, ...fromGolf, ...fromLodging, ...fromExtra];
}

function renderLodging() {
  const cost = lodgingBreakdown();
  if (document.activeElement !== lodgingNightly) lodgingNightly.value = cost.nightly ? String(cost.nightly) : "";
  if (document.activeElement !== lodgingPeople) lodgingPeople.value = String(cost.people);
  if (document.activeElement !== lodgingNights) lodgingNights.value = String(cost.nights);
  if (document.activeElement !== lodgingCurrency) lodgingCurrency.value = cost.currency;
  lodgingSummary.innerHTML = `
    <span>1인당 1박 <strong>${originalMoneyText(cost.perPersonNightOriginal, cost.currency)}</strong></span>
    <span>1인 총액 <strong>${phpText(cost.perPersonTotalPhp)}</strong> · ${krwText(cost.perPersonTotalPhp)} · ${usdText(cost.perPersonTotalPhp)}</span>
    <span>객실 총액 ${originalMoneyText(cost.groupTotalOriginal, cost.currency)} (${phpText(cost.groupTotalPhp)})</span>
  `;
}

function renderSpend() {
  const items = spendItems();
  const total = items.reduce((sum, item) => sum + item.amount, 0);
  // 환전해야 할 금액 = 총액 − 선결제(현지에서 쓸 일정+골프 비용)
  const exchange = items.filter((item) => !item.prepaid).reduce((sum, item) => sum + item.amount, 0);

  spendSummary.innerHTML = `
    <div class="spend-total-bar__item">
      <span class="spend-total-bar__label">전체 예상 지출 (선결제 포함)</span>
      <span class="spend-total-bar__amounts"><strong>${phpText(total)}</strong> · ${krwText(total)} · ${usdText(total)}</span>
    </div>
    <div class="spend-total-bar__item">
      <span class="spend-total-bar__label">환전할 금액 (선결제 제외)</span>
      <span class="spend-total-bar__amounts"><strong>${phpText(exchange)}</strong> · ${krwText(exchange)} · ${usdText(exchange)}</span>
    </div>
  `;

  // 기본 분류 순서를 먼저, 그 뒤에 "기타" 직접 입력 분류를 이어 붙인다.
  const customCats = [...new Set(items.map((item) => item.category))].filter((cat) => !eventCategories.includes(cat));
  const categoryOrder = [...eventCategories, ...customCats];

  const byDay = new Map();
  items.forEach((item) => byDay.set(item.day, (byDay.get(item.day) || 0) + item.amount));
  const days = [...byDay.keys()].sort((a, b) => a - b);

  const detailRows = items
    .filter((item) => item.amount > 0)
    .sort((a, b) => a.day - b.day || b.amount - a.amount);

  const moneyCells = (value) => `<td>${phpText(value)}</td><td>${krwText(value)}</td><td>${usdText(value)}</td>`;
  const moneyInline = (value) => `<span class="spend-money">${phpText(value)} · ${krwText(value)} · ${usdText(value)}</span>`;
  const categoryItemRows = categoryOrder.flatMap((category) => {
    const categoryItems = items.filter((item) => item.category === category && item.amount > 0);
    if (!categoryItems.length) return [];
    const groups = new Map();
    categoryItems.forEach((item) => {
      const amount = Number(item.amount || 0);
      const key = `${item.name}\u0000${amount}`;
      const current = groups.get(key) || { category, name: item.name, unit: amount, count: 0, total: 0 };
      current.count += 1;
      current.total += amount;
      groups.set(key, current);
    });
    const rows = [...groups.values()].sort((a, b) => b.total - a.total || String(a.name).localeCompare(String(b.name)));
    const subtotal = rows.reduce((sum, row) => sum + row.total, 0);
    const count = rows.reduce((sum, row) => sum + row.count, 0);
    return [
      ...rows,
      { category, name: "소계", unit: 0, count, total: subtotal, subtotal: true },
    ];
  });

  spendBreakdown.innerHTML = `
    <h3 class="spend-heading">카테고리별</h3>
    <table>
      <thead><tr><th>분류</th><th>항목</th><th>1회 금액</th><th>횟수</th><th>총액</th></tr></thead>
      <tbody>
        ${categoryItemRows.map((row) => `
          <tr class="${row.subtotal ? "spend-subtotal-row" : ""}">
            <td class="golf-ref__name">${html(row.category)}</td>
            <td class="golf-ref__name">${html(row.name)}</td>
            <td>${row.subtotal ? "" : moneyInline(row.unit)}</td>
            <td>${row.count.toLocaleString("ko-KR")}회</td>
            <td>${moneyInline(row.total)}</td>
          </tr>
        `).join("")}
        <tr class="spend-total-row"><td class="golf-ref__name" colspan="4">합계</td><td>${moneyInline(total)}</td></tr>
      </tbody>
    </table>

    <h3 class="spend-heading">일차별</h3>
    <table>
      <thead><tr><th>일차</th><th>페소(₱)</th><th>원(₩)</th><th>달러($)</th></tr></thead>
      <tbody>
        ${days.map((day) => `<tr><td class="golf-ref__name">${day ? `${day}일차` : "공통/추가"}</td>${moneyCells(byDay.get(day))}</tr>`).join("")}
        <tr class="spend-total-row"><td class="golf-ref__name">합계</td>${moneyCells(total)}</tr>
      </tbody>
    </table>

    <h3 class="spend-heading">항목별</h3>
    <table>
      <thead><tr><th>일차</th><th>항목</th><th>분류</th><th>페소(₱)</th><th>원(₩)</th><th>달러($)</th></tr></thead>
      <tbody>
        ${detailRows.map((item) => `<tr><td>${item.day ? `${item.day}일차` : item.prepaid ? "선결제" : "공통/추가"}</td><td class="golf-ref__name">${html(item.name)}</td><td>${html(item.category)}</td>${moneyCells(item.amount)}</tr>`).join("")}
      </tbody>
    </table>
  `;
}

// === 선결제 / 기타 지출 (추가·삭제·통화 선택) ===
function renderExtraSpends() {
  const categoryOptions = (selected) => eventCategories.map((name) =>
    `<option value="${name}" ${name === selected ? "selected" : ""}>${name}</option>`
  ).join("");
  const currencyLabels = { KRW: "₩ 원", PHP: "₱ 페소", USD: "$ 달러" };
  const currencyOptions = (selected) => spendCurrencies.map((code) =>
    `<option value="${code}" ${code === selected ? "selected" : ""}>${currencyLabels[code]}</option>`
  ).join("");
  const payLabels = { prepaid: "선결제", onsite: "현지결제(환전)" };
  const payOptions = (selected) => Object.entries(payLabels).map(([code, label]) =>
    `<option value="${code}" ${code === selected ? "selected" : ""}>${label}</option>`
  ).join("");

  extraSpendList.innerHTML = extraSpends.map((item) => {
    const currency = spendCurrencyOf(item);
    const php = toPhp(item.amount, currency);
    const category = eventCategories.includes(item.category) ? item.category : "기타";
    const pay = spendPaymentOf(item);
    return `
      <div class="spend-item${pay === "onsite" ? " spend-item--onsite" : ""}" data-spend-id="${html(item.id)}">
        <input class="spend-item__name" data-spend-field="name" aria-label="항목" placeholder="예: 항공료, 숙박비, 차량렌트비" value="${html(item.name || "")}" />
        <select data-spend-field="pay" aria-label="결제 구분">${payOptions(pay)}</select>
        <select data-spend-field="category" aria-label="분류">${categoryOptions(category)}</select>
        <select data-spend-field="currency" aria-label="통화">${currencyOptions(currency)}</select>
        <input class="spend-item__amount" data-spend-field="amount" inputmode="numeric" aria-label="금액" value="${html(item.amount || "")}" />
        <span class="spend-item__conv">≈ ${phpText(php)} · ${krwText(php)} · ${usdText(php)}</span>
        <button class="delete-inline delete-spend" type="button" aria-label="삭제">×</button>
      </div>
    `;
  }).join("");

  if (!extraSpends.length) {
    extraSpendList.innerHTML = `<p class="meta">"추가"로 항목을 넣고 결제 구분을 고르세요. 선결제(항공료 등)는 총액에만, 현지결제(숙박비·차량렌트비 등)는 환전 금액에도 더해집니다.</p>`;
  }
}

// === 환율 ===
function renderRates() {
  if (document.activeElement !== ratePhpKrw) ratePhpKrw.value = String(rates.phpToKrw);
  if (document.activeElement !== rateKrwUsd) rateKrwUsd.value = String(rates.krwPerUsd);
  if (document.activeElement !== ratePhpUsd) ratePhpUsd.value = String(rates.phpPerUsd);
  ratesUpdated.textContent = rates.updatedAt ? `갱신: ${rates.updatedAt}` : "직접 입력 또는 자동 갱신";
}

async function fetchRates() {
  const original = fetchRatesButton.textContent;
  fetchRatesButton.disabled = true;
  fetchRatesButton.textContent = "갱신 중…";
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/PHP");
    const data = await response.json();
    if (data.result !== "success" || !data.rates || !data.rates.KRW || !data.rates.USD) throw new Error("bad");
    rates.phpToKrw = data.rates.KRW;
    rates.phpPerUsd = 1 / data.rates.USD;
    rates.krwPerUsd = data.rates.KRW / data.rates.USD;
    rates.updatedAt = data.time_last_update_utc || new Date().toLocaleString("ko-KR");
    saveRates();
    renderRates();
    renderLodging();
    renderExtraSpends();
    renderSpend();
    renderGolf();
  } catch (error) {
    alert("환율을 자동으로 가져오지 못했습니다. 인터넷 연결을 확인하거나 환율을 직접 입력해 주세요.");
  } finally {
    fetchRatesButton.disabled = false;
    fetchRatesButton.textContent = original;
  }
}

// === 골프 ===
// 기본 요금에 사용자의 요금표 수정값을 덮어쓴 실제 골프장 정보
function golfCourse(id) {
  const base = golfCourses.find((course) => course.id === id) || golfCourses[0];
  const edit = golf.courseEdits[base.id];
  return edit ? { ...base, ...edit } : base;
}

function golfCartField(people) {
  if (people === 2) return "cart2";
  if (people === 3) return "cart3";
  return "cart4";
}

function golfCartPerPerson(course, people) {
  return course[golfCartField(people)];
}

function golfRoundBreakdown(round, people) {
  const course = golfCourse(round.course);
  const greenFee = round.day === "주중" ? course.weekday : course.weekend;
  const caddy = course.caddy;
  const cart = golfCartPerPerson(course, people);
  const extra = course.extra;
  return { course, greenFee, caddy, cart, extra, total: greenFee + caddy + cart + extra };
}

function renderGolf() {
  golfPeople.value = String(golf.people);
  renderGolfRounds();
  renderGolfSummary();
  renderGolfRefTable();
}

function renderGolfRounds() {
  const people = golf.people;
  golfRounds.innerHTML = golf.rounds.map((round, index) => {
    const { greenFee, caddy, cart, extra, total } = golfRoundBreakdown(round, people);
    const options = golfCourses.map((course) =>
      `<option value="${html(course.id)}" ${course.id === round.course ? "selected" : ""}>${html(course.name)} ${html(course.season)}</option>`
    ).join("");
    return `
      <article class="golf-round" data-round-id="${html(round.id)}">
        <div class="golf-round__head">
          <span class="golf-round__no">라운드 ${index + 1}</span>
          <button class="delete-inline delete-round" type="button" aria-label="라운드 삭제">×</button>
        </div>
        <div class="golf-round__controls">
          <label class="inline-field">
            <span>골프장</span>
            <select data-golf-field="course" aria-label="골프장">${options}</select>
          </label>
          <label class="inline-field">
            <span>요일</span>
            <select data-golf-field="day" aria-label="요일">
              <option value="주중" ${round.day === "주중" ? "selected" : ""}>주중</option>
              <option value="주말" ${round.day === "주말" ? "selected" : ""}>주말</option>
            </select>
          </label>
          <label class="inline-field">
            <span>일정 일차</span>
            <input class="budget-edit" data-golf-field="tripDay" inputmode="numeric" aria-label="일정 일차" value="${html(round.tripDay)}" />
          </label>
          <label class="inline-field">
            <span>시간</span>
            <input data-golf-field="time" aria-label="라운드 시간" placeholder="06:30" value="${html(round.time || "")}" />
          </label>
        </div>
        <div class="golf-breakdown">
          <span>그린피 <b>${phpText(greenFee)}</b></span>
          <span>캐디 <b>${phpText(caddy)}</b></span>
          <span>카트 <b>${phpText(cart)}</b></span>
          <span>보험+컨슈 <b>${phpText(extra)}</b></span>
        </div>
        <div class="golf-round__total">
          <span>1인 합계</span>
          <strong>${phpText(total)}</strong>
          <small>${krwText(total)} · ${usdText(total)}</small>
        </div>
      </article>
    `;
  }).join("");
}

function renderGolfSummary() {
  const people = golf.people;
  const perPerson = golf.rounds.reduce((sum, round) => sum + golfRoundBreakdown(round, people).total, 0);
  const roundCount = golf.rounds.length;
  const average = roundCount ? perPerson / roundCount : 0;
  const grand = perPerson * people;

  golfSummary.innerHTML = `
    <div class="golf-stat">
      <span>${roundCount}라운드 합계 (1인)</span>
      <strong>${phpText(perPerson)}</strong>
      <small>${krwText(perPerson)} · ${usdText(perPerson)}</small>
    </div>
    <div class="golf-stat">
      <span>1라운드 평균 (1인)</span>
      <strong>${phpText(average)}</strong>
      <small>${krwText(average)} · ${usdText(average)}</small>
    </div>
    <div class="golf-stat is-grand">
      <span>전체 합계 (${people}명 × ${roundCount}R)</span>
      <strong>${phpText(grand)}</strong>
      <small>${krwText(grand)} · ${usdText(grand)}</small>
    </div>
  `;

  renderGolfRefTable();
}

// 요금표: 값을 직접 수정 가능. 입력은 ₱ 기준이며 수정값은 골프 데이터에 저장된다.
// 카트 칸은 현재 선택한 인원수(2/3/4)에 해당하는 카트 비용을 편집한다.
function renderGolfRefTable() {
  const people = golf.people;
  const cartField = golfCartField(people);
  golfRefTable.innerHTML = `
    <table class="golf-ref__editable">
      <thead>
        <tr><th>골프장</th><th>그린피<br>주중</th><th>그린피<br>주말</th><th>캐디</th><th>카트<br>(${people}인)</th><th>보험<br>+컨슈</th></tr>
      </thead>
      <tbody>
        ${golfCourses.map((base) => {
          const course = golfCourse(base.id);
          const cell = (field) => `<td><input class="golf-ref__input" inputmode="numeric" data-course="${html(base.id)}" data-field="${field}" value="${html(course[field])}" aria-label="${html(course.name)} ${field}" /></td>`;
          return `
          <tr data-course="${html(base.id)}">
            <td class="golf-ref__name"><input class="golf-ref__name-input" data-course="${html(base.id)}" data-field="name" value="${html(course.name)}" aria-label="골프장 이름" /><small>${html(base.season)}</small></td>
            ${cell("weekday")}
            ${cell("weekend")}
            ${cell("caddy")}
            ${cell(cartField)}
            ${cell("extra")}
          </tr>`;
        }).join("")}
      </tbody>
    </table>
    <div class="golf-ref__actions">
      <button class="data-button is-danger" id="resetCoursesButton" type="button">요금표 기본값으로 되돌리기</button>
    </div>
  `;
}

// === 메모 ===
function renderMemo() {
  if (memoField.innerHTML !== memoHtml) memoField.innerHTML = memoHtml;
}

// 붙여넣은 이미지를 캔버스로 축소/압축해 localStorage에 부담이 적은 data URL로 변환한다.
function readImageResized(file, maxDim = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("이미지를 불러올 수 없습니다."));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error("파일을 읽을 수 없습니다."));
    reader.readAsDataURL(file);
  });
}

function insertImageAtCursor(src) {
  const img = document.createElement("img");
  img.src = src;
  const selection = window.getSelection();
  if (selection && selection.rangeCount && memoField.contains(selection.anchorNode)) {
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(img);
    range.setStartAfter(img);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    memoField.appendChild(img);
  }
}

// === 뷰 전환 ===
function renderView() {
  document.querySelectorAll(".guide-view").forEach((element) => element.classList.toggle("is-hidden", state.view !== "guide"));
  document.querySelector(".spend-view").classList.toggle("is-hidden", state.view !== "spend");
  document.querySelector(".golf-view").classList.toggle("is-hidden", state.view !== "golf");
  document.querySelector(".notes-view").classList.toggle("is-hidden", state.view !== "notes");
  document.querySelectorAll(".top-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
}

function renderAll() {
  renderTrip();
  renderTimeline();
  renderMemo();
  renderRates();
  renderLodging();
  renderExtraSpends();
  renderSpend();
  renderGolf();
  renderView();
}

// === 저장된 일정(클라우드 DB / 로컬 폴백) / 초기화 ===
// 일정이 매번 비슷하므로, 현재 상태를 통째로 이름 붙여 저장해 두고 다시 불러온다.
// 화면에 표시 중인 목록 캐시 (id로 빠르게 조회하기 위함)
let savedCache = [];

// 현재 localStorage의 모든 데이터를 하나의 스냅샷으로 묶는다.
function currentSnapshotData() {
  const data = {};
  backupKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value != null) data[key] = value;
  });
  return data;
}

// --- 로컬 폴백 저장소 ---
function loadLocalSaved() {
  try {
    const list = JSON.parse(localStorage.getItem(savedTripsKey));
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}
function persistLocalSaved(list) {
  localStorage.setItem(savedTripsKey, JSON.stringify(list));
}

function saveCloudGroup(group) {
  cloudGroup = group && group.id ? group : {};
  if (cloudGroup.id) localStorage.setItem(cloudGroupKey, JSON.stringify(cloudGroup));
  else localStorage.removeItem(cloudGroupKey);
}

async function hashCloudCode(code) {
  const bytes = new TextEncoder().encode(code);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

function cloudCollectionPath() {
  return `/${FIRESTORE_ROOT}/${encodeURIComponent(cloudGroup.id)}/${FIRESTORE_COLLECTION}`;
}

function storageLabel() {
  return cloudOn() ? `클라우드(${cloudGroup.label || "공유 코드"})` : "이 브라우저";
}

function renderCloudStatus() {
  if (!cloudStatus) return;
  cloudStatus.textContent = cloudOn()
    ? `저장 위치: 클라우드 · 코드: ${cloudGroup.label || "설정됨"}`
    : "저장 위치: 이 브라우저 · 클라우드 공유 코드를 설정하면 다른 기기와 저장본을 공유합니다.";
  if (clearCloudCodeButton) clearCloudCodeButton.hidden = !cloudOn();
}

async function setCloudCode() {
  if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
    alert("Firebase 설정이 없어 이 브라우저 로컬 저장으로만 사용합니다.");
    return;
  }
  const current = cloudGroup.label || "";
  const code = (prompt("동행자와 함께 쓸 클라우드 공유 코드를 입력하세요. 같은 코드를 입력한 기기끼리 저장본을 공유합니다.", current) || "").trim();
  if (!code) return;
  if (code.length < 6) {
    alert("공유 코드는 추측하기 어렵게 6자 이상으로 입력해 주세요.");
    return;
  }
  try {
    saveCloudGroup({ id: await hashCloudCode(code), label: code.slice(0, 2) + "…" + code.slice(-2) });
    renderCloudStatus();
    await renderSavedList();
  } catch (error) {
    console.error(error);
    alert("클라우드 코드를 설정하지 못했습니다. 이 브라우저가 보안 연결(HTTPS)에서 열렸는지 확인해 주세요.");
  }
}

function clearCloudCode() {
  if (!cloudOn()) return;
  if (!confirm("클라우드 저장본 연결을 해제하고 이 브라우저 로컬 저장본만 볼까요? 클라우드 데이터는 삭제되지 않습니다.")) return;
  saveCloudGroup({});
  renderCloudStatus();
  renderSavedList();
}

// --- Firestore REST 호출 헬퍼 ---
async function firestore(path, options = {}) {
  const sep = path.includes("?") ? "&" : "?";
  const res = await fetch(`${firestoreBase()}${path}${sep}key=${firebaseConfig.apiKey}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) throw new Error(`Firestore ${res.status}: ${await res.text()}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
// data(문자열 맵)를 Firestore 타입 형식으로 인코딩/디코딩
const encodeStringMap = (map) => ({
  mapValue: { fields: Object.fromEntries(Object.entries(map).map(([k, v]) => [k, { stringValue: String(v) }])) },
});
const decodeStringMap = (field) => {
  const fields = field?.mapValue?.fields || {};
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v.stringValue ?? ""]));
};
const encodeDoc = ({ name, savedAt, data }) => ({
  fields: { name: { stringValue: name }, saved_at: { stringValue: savedAt }, data: encodeStringMap(data) },
});
// Firestore 문서를 화면용 형태로 정규화 (문서 id는 경로 마지막 조각)
const decodeDoc = (doc) => ({
  id: doc.name.split("/").pop(),
  name: doc.fields?.name?.stringValue ?? "",
  savedAt: doc.fields?.saved_at?.stringValue ?? "",
  data: decodeStringMap(doc.fields?.data),
});

// --- 데이터 레이어 (클라우드 ↔ 로컬 자동 선택) ---
async function dbList() {
  if (cloudOn()) {
    const res = await firestore(`${cloudCollectionPath()}?pageSize=300`);
    const docs = (res?.documents || []).map(decodeDoc);
    // 최신 저장본이 위로 오도록 저장시각 내림차순 정렬 (ISO 문자열은 사전식 정렬과 일치)
    return docs.sort((a, b) => String(b.savedAt).localeCompare(String(a.savedAt)));
  }
  return loadLocalSaved();
}
async function dbFindByName(name) {
  return (await dbList()).find((item) => item.name === name) || null;
}
async function dbInsert(name, data, stamp) {
  if (cloudOn()) {
    const doc = await firestore(cloudCollectionPath(), {
      method: "POST",
      body: JSON.stringify(encodeDoc({ name, savedAt: stamp, data })),
    });
    return decodeDoc(doc);
  }
  const list = loadLocalSaved();
  const entry = { id: `trip-${Date.now()}`, name, savedAt: stamp, data };
  list.unshift(entry);
  persistLocalSaved(list);
  return entry;
}
async function dbUpdate(id, fields) {
  if (cloudOn()) {
    // 변경할 필드만 updateMask로 지정해 나머지 필드는 보존한다.
    const masks = [];
    const docFields = {};
    if ("name" in fields) { masks.push("name"); docFields.name = { stringValue: fields.name }; }
    if ("savedAt" in fields) { masks.push("saved_at"); docFields.saved_at = { stringValue: fields.savedAt }; }
    if ("data" in fields) { masks.push("data"); docFields.data = encodeStringMap(fields.data); }
    const mask = masks.map((m) => `updateMask.fieldPaths=${m}`).join("&");
    await firestore(`${cloudCollectionPath()}/${encodeURIComponent(id)}?${mask}`, {
      method: "PATCH",
      body: JSON.stringify({ fields: docFields }),
    });
    return;
  }
  const list = loadLocalSaved();
  const item = list.find((entry) => entry.id === id);
  if (item) Object.assign(item, fields);
  persistLocalSaved(list);
}
async function dbDelete(id) {
  if (cloudOn()) {
    await firestore(`${cloudCollectionPath()}/${encodeURIComponent(id)}`, { method: "DELETE" });
    return;
  }
  persistLocalSaved(loadLocalSaved().filter((entry) => entry.id !== id));
}

async function saveCurrentTrip() {
  const suggested = (trip.startDate ? `${trip.startDate} ` : "") + `${trip.days}일 일정`;
  const name = (prompt("저장할 이름을 입력하세요.", suggested) || "").trim();
  if (!name) return;
  const stamp = new Date().toISOString();
  const data = currentSnapshotData();
  try {
    const existing = await dbFindByName(name);
    if (existing) {
      if (!confirm(`"${name}" 저장본이 이미 있습니다. 덮어쓸까요?`)) return;
      await dbUpdate(existing.id, { data, savedAt: stamp });
    } else {
      await dbInsert(name, data, stamp);
    }
    await renderSavedList();
    alert(`"${name}"(으)로 저장했습니다. (${storageLabel()})`);
  } catch (error) {
    console.error(error);
    alert(cloudOn() ? "클라우드 저장에 실패했습니다. 인터넷 연결, 공유 코드, Firestore 규칙을 확인해 주세요." : "로컬 저장에 실패했습니다. 브라우저 저장 공간을 확인해 주세요.");
  }
}

function loadTripSnapshot(id) {
  const item = savedCache.find((entry) => entry.id === id);
  if (!item) return;
  if (!confirm(`현재 편집 내용을 "${item.name}" 저장본으로 덮어쓸까요?`)) return;
  // 저장본에 없는 키는 비워 두어, 불러온 상태와 정확히 일치하도록 한다.
  backupKeys.forEach((key) => {
    if (typeof item.data?.[key] === "string") localStorage.setItem(key, item.data[key]);
    else localStorage.removeItem(key);
  });
  localStorage.setItem(seededKey, "done");
  location.reload();
}

async function deleteTripSnapshot(id) {
  const item = savedCache.find((entry) => entry.id === id);
  if (!item) return;
  if (!confirm(`저장본 "${item.name}"을(를) 삭제할까요?`)) return;
  try {
    await dbDelete(id);
    await renderSavedList();
  } catch (error) {
    console.error(error);
    alert(cloudOn() ? "클라우드 저장본 삭제에 실패했습니다. 인터넷 연결과 Firestore 규칙을 확인해 주세요." : "로컬 저장본 삭제에 실패했습니다.");
  }
}

async function renameTripSnapshot(id) {
  const item = savedCache.find((entry) => entry.id === id);
  if (!item) return;
  const name = (prompt("새 이름을 입력하세요.", item.name) || "").trim();
  if (!name || name === item.name) return;
  try {
    if (savedCache.some((entry) => entry.id !== id && entry.name === name)) {
      alert("같은 이름의 저장본이 이미 있습니다.");
      return;
    }
    await dbUpdate(id, { name });
    await renderSavedList();
  } catch (error) {
    console.error(error);
    alert(cloudOn() ? "클라우드 저장본 이름 변경에 실패했습니다. 인터넷 연결과 Firestore 규칙을 확인해 주세요." : "로컬 저장본 이름 변경에 실패했습니다.");
  }
}

async function renderSavedList() {
  renderCloudStatus();
  savedList.innerHTML = `<p class="meta saved-empty">불러오는 중…</p>`;
  let list;
  try {
    list = await dbList();
  } catch (error) {
    console.error(error);
    savedCache = [];
    savedList.innerHTML = `<p class="meta saved-empty">목록을 불러오지 못했습니다. ${cloudOn() ? "인터넷 연결, 공유 코드, Firestore 규칙을 확인해 주세요." : "브라우저 저장소를 확인해 주세요."}</p>`;
    return;
  }
  savedCache = list;
  const where = storageLabel();
  if (!list.length) {
    savedList.innerHTML = `<p class="meta saved-empty">저장된 일정이 없습니다. "현재 일정 저장"으로 지금 화면을 저장해 보세요. (저장 위치: ${where})</p>`;
    return;
  }
  savedList.innerHTML = list.map((item) => {
    const when = item.savedAt ? String(item.savedAt).slice(0, 10) : "";
    return `
      <article class="saved-item" data-id="${html(item.id)}">
        <div class="saved-item__info">
          <strong class="saved-item__name">${html(item.name)}</strong>
          <span class="meta">${html(when)} · ${where}</span>
        </div>
        <div class="saved-item__actions">
          <button class="small-action" type="button" data-saved-action="load">불러오기</button>
          <button class="small-action" type="button" data-saved-action="rename">이름변경</button>
          <button class="small-action is-danger" type="button" data-saved-action="delete">삭제</button>
        </div>
      </article>
    `;
  }).join("");
}

function openSavedDialog() {
  renderCloudStatus();
  renderSavedList();
  if (typeof savedDialog.showModal === "function") savedDialog.showModal();
  else savedDialog.setAttribute("open", "");
}

// 완전 초기화: 일정·지출·골프·메모·여행기간·환율을 모두 삭제하고 빈 상태로 시작한다.
function resetData() {
  if (!confirm("모든 데이터(일정·지출·골프·메모·여행기간·환율)를 완전히 삭제할까요? 되돌릴 수 없습니다.")) return;
  backupKeys.forEach((key) => localStorage.removeItem(key));
  localStorage.setItem(seededKey, "done");
  location.reload();
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportBackup() {
  downloadJson(`clark-trip-backup-${excelDateStamp()}.json`, {
    version: 1,
    exportedAt: new Date().toISOString(),
    data: currentSnapshotData(),
  });
}

async function importBackup(file) {
  try {
    const payload = JSON.parse(await file.text());
    const data = payload?.data;
    if (!data || typeof data !== "object") throw new Error("bad backup");
    const unknownKeys = Object.keys(data).filter((key) => !backupKeys.includes(key));
    if (unknownKeys.length) throw new Error("bad keys");
    for (const key of backupKeys) {
      if (data[key] != null && typeof data[key] !== "string") throw new Error("bad value");
      if (data[key] && jsonBackupKeys.includes(key)) JSON.parse(data[key]);
    }
    if (!confirm("백업 파일의 데이터로 현재 일정·지출·골프·메모·여행기간·환율을 복원할까요? 현재 편집 내용은 덮어써집니다.")) return;
    backupKeys.forEach((key) => {
      if (typeof data[key] === "string") localStorage.setItem(key, data[key]);
      else localStorage.removeItem(key);
    });
    localStorage.setItem(seededKey, "done");
    location.reload();
  } catch (error) {
    console.error(error);
    alert("백업 파일을 읽지 못했습니다. 이 앱에서 내보낸 JSON 백업 파일인지 확인해 주세요.");
  }
}

// === 이벤트 핸들러 ===
daySegments.addEventListener("click", (event) => {
  const button = event.target.closest(".segment");
  if (!button) return;
  state.day = button.dataset.day;
  renderDaySegments();
  renderTimeline();
});

// 여행 기간 입력: 한쪽을 바꾸면 다른 쪽을 자동 맞춤(일수 = 박수 + 1)하고 일차 탭을 다시 만든다.
// 출국일이 설정돼 있으면 귀국일을 일수에 맞춰 다시 계산한다.
function syncTripDates() {
  if (trip.startDate) trip.endDate = isoAddDays(trip.startDate, trip.days - 1);
}

function syncLodgingNightsWithTrip(previousTripNights) {
  if (Number(lodging.nights) !== Number(previousTripNights)) return;
  lodging.nights = trip.nights;
  saveLodging();
}

tripNights.addEventListener("input", () => {
  const previousTripNights = trip.nights;
  const nights = Math.max(0, Math.min(60, Math.round(Number(tripNights.value) || 0)));
  trip.nights = nights;
  trip.days = nights + 1;
  tripDays.value = String(trip.days);
  syncTripDates();
  syncLodgingNightsWithTrip(previousTripNights);
  saveTrip();
  renderTrip();
  renderLodging();
  renderTimeline();
  renderSpend();
});

tripDays.addEventListener("input", () => {
  const previousTripNights = trip.nights;
  const days = Math.max(1, Math.min(60, Math.round(Number(tripDays.value) || 1)));
  trip.days = days;
  trip.nights = Math.max(0, days - 1);
  tripNights.value = String(trip.nights);
  syncTripDates();
  syncLodgingNightsWithTrip(previousTripNights);
  saveTrip();
  renderTrip();
  renderLodging();
  renderTimeline();
  renderSpend();
});

// === 여정안내서(PDF) 자동 인식 ===
let pdfjsPromise = null;
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfjsPromise) return pdfjsPromise;
  pdfjsPromise = loadFirstAvailable(
    ["assets/lib/pdf.min.js", "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"],
    () => Boolean(window.pdfjsLib)
  ).then(() => {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "assets/lib/pdf.worker.min.js";
    return window.pdfjsLib;
  });
  return pdfjsPromise;
}

async function extractPdfText(file) {
  const pdfjsLib = await loadPdfJs();
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = "";
  for (let page = 1; page <= pdf.numPages; page += 1) {
    const content = await (await pdf.getPage(page)).getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }
  return text;
}

const PDF_MONTHS = { JAN: 1, FEB: 2, MAR: 3, APR: 4, MAY: 5, JUN: 6, JUL: 7, AUG: 8, SEP: 9, OCT: 10, NOV: 11, DEC: 12 };

function pdfToIso(dd, mmm, yy) {
  const month = PDF_MONTHS[mmm];
  if (!month) return null;
  return `20${yy}-${String(month).padStart(2, "0")}-${dd}`;
}

// 구간 머리말에서 출발/도착 공항(영문 대문자 도시명)을 뽑아낸다. 직전 구간 도착지를
// 이번 구간 출발지로 맞춰 SEOUL INCHEON 같은 2단어 공항도 경계를 바르게 가른다.
const PDF_CITY_NOISE = new Set(["NOT", "VALID", "BEFORE", "AFTER", "FARE", "BASIS", "VIA", "OPERATED", "MARKETED", "FREE", "BAGGAGE", "ALLOWANCE", "LAYOVER", "OK", "PC", "KRW", "CASH", "SEAT", "CLASS", "STATUS", "DATE", "FROM", "FLIGHT", "ARRIVAL", "DEPARTURE", "RESERVATION", "TERMINAL", "AIRLINES", "ASIANA"]);

function pdfCityTokens(window) {
  const cleaned = window
    .replace(/\d{2}[A-Z]{3}\d{2}/g, " ")
    .replace(/Fare Basis\s+\S+/gi, " ")
    .replace(/Terminal\s*\d+/gi, " ")
    .replace(/[A-Z]{2}\d{3,4}/g, " ")
    .replace(/\b\d{1,2}:\d{2}\b/g, " ");
  return (cleaned.match(/[A-Z]{3,}/g) || []).filter((token) => !PDF_CITY_NOISE.has(token));
}

// 전자항공권에서 항공편(편명·날짜·출발/도착 시각·구간)과 총 항공료(KRW)를 추출한다.
function parseItinerary(text) {
  const flightRe = /([A-Z]{2}\d{3,4})\s+[A-Z]\s+(\d{2})([A-Z]{3})(\d{2})\s*\((?:MON|TUE|WED|THU|FRI|SAT|SUN)\)\s*(\d{1,2}:\d{2})\s+(\d{1,2}:\d{2})\s*(\+\d)?/g;
  const flights = [];
  let match;
  let lastIndex = 0;
  let prevDest = null;
  while ((match = flightRe.exec(text))) {
    const iso = pdfToIso(match[2], match[3], match[4]);
    if (!iso) continue;
    const tokens = pdfCityTokens(text.slice(lastIndex, match.index));
    const joined = tokens.join(" ");
    let origin = "";
    let dest = "";
    if (prevDest && joined.startsWith(prevDest)) {
      origin = prevDest;
      dest = joined.slice(prevDest.length).trim();
    } else if (tokens.length >= 2) {
      origin = tokens.slice(0, -1).join(" ");
      dest = tokens[tokens.length - 1];
    }
    prevDest = dest || prevDest;
    flights.push({
      flightNo: match[1],
      dateIso: iso,
      dep: match[5],
      arr: match[6],
      off: match[7] || "",
      route: origin && dest ? `${origin}→${dest}` : "",
    });
    lastIndex = flightRe.lastIndex;
  }

  // 출국/귀국 날짜: 항공편이 있으면 그 날짜, 없으면 DDMMMYY 토큰의 최소/최대
  let dates = flights.map((flight) => flight.dateIso);
  if (!dates.length) {
    const loose = /\b(\d{2})([A-Z]{3})(\d{2})\b/g;
    while ((match = loose.exec(text))) {
      const iso = pdfToIso(match[1], match[2], match[3]);
      if (iso) dates.push(iso);
    }
  }
  if (!dates.length) return null;
  const sorted = [...dates].sort();
  const startDate = sorted[0];
  const endDate = sorted[sorted.length - 1];
  const days = Math.max(1, Math.min(60, isoDiffDays(startDate, endDate) + 1));
  const fareMatch = text.match(/Total Amount\s*KRW\s*([\d,]+)/i) || text.match(/합계\D*KRW\s*([\d,]+)/);
  const airfareKrw = fareMatch ? Number(fareMatch[1].replace(/,/g, "")) : 0;
  return { startDate, endDate, days, nights: Math.max(0, days - 1), flights, airfareKrw };
}

async function importItineraryPdf(file) {
  importPdfButton.disabled = true;
  const original = importPdfButton.textContent;
  importPdfButton.textContent = "인식 중…";
  try {
    const text = await extractPdfText(file);
    const result = parseItinerary(text);
    if (!result) {
      alert("여정에서 날짜를 찾지 못했습니다. 텍스트 기반 PDF(전자항공권)인지 확인하거나 기간을 직접 입력해 주세요.");
      return;
    }
    const flightLines = result.flights.map((flight) =>
      `  ✈ ${flight.flightNo} ${flight.route || ""} ${flight.dateIso.slice(5)} ${flight.dep}→${flight.arr}${flight.off ? `(${flight.off})` : ""}`
    );
    const airfarePhp = result.airfareKrw && rates.phpToKrw > 0 ? Math.round(result.airfareKrw / rates.phpToKrw) : 0;
    const ok = confirm(
      `여정 인식 결과\n` +
      `출국: ${result.startDate} (${isoDowKr(result.startDate)})\n` +
      `귀국: ${result.endDate} (${isoDowKr(result.endDate)})\n` +
      `→ ${result.nights}박 ${result.days}일\n` +
      (flightLines.length ? `\n비행편 ${result.flights.length}개를 일정에 추가:\n${flightLines.join("\n")}\n` : "") +
      (result.airfareKrw ? `\n항공료: ₩${result.airfareKrw.toLocaleString("ko-KR")} (≈ ${phpText(airfarePhp)})\n` : "") +
      `\n적용할까요? (기존에 불러온 비행/항공료 항목은 새로 교체됩니다)`
    );
    if (!ok) return;

    const previousTripNights = trip.nights;
    trip.startDate = result.startDate;
    trip.endDate = result.endDate;
    trip.days = result.days;
    trip.nights = result.nights;
    syncLodgingNightsWithTrip(previousTripNights);
    saveTrip();

    // 이전에 PDF로 넣은 항목(비행 일정/항공료)을 지우고 새로 추가한다.
    events = events.filter((event) => !event.fromPdf);
    extraSpends = extraSpends.filter((item) => !item.fromPdf);
    const stamp = Date.now();
    result.flights.forEach((flight, index) => {
      const tripDay = Math.max(1, isoDiffDays(result.startDate, flight.dateIso) + 1);
      const label = result.flights.length > 1 ? (index === 0 ? "출국" : index === result.flights.length - 1 ? "귀국" : "비행") : "비행";
      const name = `✈ ${flight.flightNo} ${label}${flight.route ? ` ${flight.route}` : ""}${flight.off ? ` (${flight.off} 도착)` : ""}`;
      events.push({ id: `flight-${stamp}-${index}`, day: tripDay, name, start: flight.dep, end: flight.arr, budget: 0, category: "교통", fromPdf: true });
    });
    // 항공료는 선결제(원화) 항목으로 추가
    if (result.airfareKrw > 0) {
      const flightNos = result.flights.map((flight) => flight.flightNo).join("/");
      extraSpends.push({ id: `airfare-${stamp}`, name: `✈ 항공료${flightNos ? ` (${flightNos})` : ""}`, category: "교통", currency: "KRW", amount: result.airfareKrw, fromPdf: true });
    }
    saveEvents();
    saveExtraSpends();
    renderTrip();
    renderTimeline();
    renderLodging();
    renderExtraSpends();
    renderSpend();
  } catch (error) {
    alert("PDF를 읽지 못했습니다. 인터넷 연결(최초 1회 라이브러리 다운로드)을 확인하거나, 스캔본이 아닌 전자항공권 PDF인지 확인해 주세요.");
  } finally {
    importPdfButton.disabled = false;
    importPdfButton.textContent = original;
  }
}

importPdfButton.addEventListener("click", () => pdfInput.click());
pdfInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importItineraryPdf(file);
  pdfInput.value = "";
});

timeline.addEventListener("input", (event) => {
  const field = event.target.dataset.eventField;
  const card = event.target.closest(".event-card");
  if (!field || !card) return;
  const item = events.find((entry) => entry.id === card.dataset.eventId);
  if (!item) return;
  const value = event.target.value;
  item[field] = field === "day" || field === "budget" ? Number(value || 0) : value;
  if (field === "start" && String(value).trim()) item.isNew = false;
  saveEvents();
  if (field === "category") {
    renderTimeline();
    renderSpend();
  } else if (field === "budget" || field === "categoryCustom") {
    renderSpend();
  }
});

timeline.addEventListener("click", (event) => {
  const goto = event.target.closest("[data-goto]");
  if (goto) {
    state.view = goto.dataset.goto;
    history.replaceState(null, "", `#${state.view}`);
    renderView();
    return;
  }
  const deleteButton = event.target.closest(".delete-event");
  if (!deleteButton) return;
  const card = deleteButton.closest(".event-card");
  const item = events.find((entry) => entry.id === card.dataset.eventId);
  if (!item || !confirm(`${item.name || "이 일정"} 항목을 삭제할까요?`)) return;
  events = events.filter((entry) => entry.id !== item.id);
  saveEvents();
  renderTimeline();
  renderSpend();
});

addEventButton.addEventListener("click", () => {
  const day = Number(state.day) || 1;
  const id = nextId("event", events);
  events.push({ id, day, name: "새 일정", budget: 0, start: "", end: "", isNew: true });
  saveEvents();
  renderTimeline();
  renderSpend();
  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-event-id="${CSS.escape(id)}"]`);
    card?.scrollIntoView({ block: "center", behavior: "smooth" });
    card?.querySelector("[data-event-field='start']")?.focus();
  });
});

// 일차 단위 복사/붙여넣기 — 한 일차의 일정 전체를 복사해 다른 일차에 그대로 추가한다.
// (골프 라운드는 골프 탭에서 일차를 지정하는 별도 항목이라 복사 대상에서 제외한다.)
const COPY_FIELDS = ["name", "start", "end", "budget", "category", "categoryCustom"];
let dayClipboard = null; // { day, items: [...] }

function refreshPasteButton() {
  if (!pasteDayButton) return;
  if (!dayClipboard || !dayClipboard.items.length) {
    pasteDayButton.hidden = true;
    return;
  }
  pasteDayButton.hidden = false;
  pasteDayButton.textContent = `${dayClipboard.day}일차 붙여넣기 (${dayClipboard.items.length})`;
}

copyDayButton?.addEventListener("click", () => {
  const day = state.day;
  const dayItems = sortDayEvents(events.filter((entry) => String(entry.day) === String(day)));
  if (!dayItems.length) {
    alert(`${day}일차에 복사할 일정이 없습니다.`);
    return;
  }
  dayClipboard = {
    day,
    items: dayItems.map((entry) => {
      const copy = {};
      COPY_FIELDS.forEach((field) => {
        if (entry[field] !== undefined) copy[field] = entry[field];
      });
      return copy;
    }),
  };
  refreshPasteButton();
});

pasteDayButton?.addEventListener("click", () => {
  if (!dayClipboard || !dayClipboard.items.length) return;
  const day = Number(state.day) || 1;
  dayClipboard.items.forEach((source, index) => {
    const id = `event-${Date.now()}-${events.length + 1 + index}`;
    events.push({ ...source, id, day });
  });
  saveEvents();
  renderTimeline();
  renderSpend();
});

// === 엑셀 다운로드 / 업로드 ===
let xlsxPromise = null;
function loadXlsx() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (xlsxPromise) return xlsxPromise;
  xlsxPromise = loadFirstAvailable(
    ["assets/lib/xlsx.full.min.js", "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"],
    () => Boolean(window.XLSX)
  ).then(() => window.XLSX);
  return xlsxPromise;
}

function excelDateStamp() {
  return new Date().toISOString().slice(0, 10);
}

function cellValue(row, names) {
  for (const name of names) {
    if (row[name] != null && String(row[name]).trim() !== "") return row[name];
  }
  return "";
}

function numberCell(value) {
  if (typeof value === "number") return value;
  const cleaned = String(value ?? "").replace(/[^\d.-]/g, "");
  return cleaned ? Number(cleaned) || 0 : 0;
}

function dayCell(value) {
  const n = numberCell(value);
  return Math.max(1, Math.min(60, Math.round(n || 1)));
}

function textCell(value) {
  return String(value ?? "").trim();
}

function paymentCode(value) {
  const text = textCell(value);
  if (/현지|onsite/i.test(text)) return "onsite";
  return "prepaid";
}

function currencyCode(value) {
  const text = textCell(value).toUpperCase();
  if (text.includes("PHP") || text.includes("페소") || text.includes("₱")) return "PHP";
  if (text.includes("USD") || text.includes("달러") || text.includes("$")) return "USD";
  return "KRW";
}

function categoryCell(value) {
  const text = textCell(value);
  return eventCategories.includes(text) ? text : "기타";
}

function sheetJson(XLSX, sheet) {
  return XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
}

async function readWorkbook(file) {
  const XLSX = await loadXlsx();
  const buffer = await file.arrayBuffer();
  return XLSX.read(buffer, { type: "array" });
}

function exportScheduleExcel() {
  loadXlsx()
    .then((XLSX) => {
      const rows = events
        .slice()
        .sort((a, b) => Number(a.day || 0) - Number(b.day || 0) || String(a.start || "").localeCompare(String(b.start || "")))
        .map((event) => ({
          "일차": Number(event.day) || 1,
          "시작": event.start || "",
          "종료": event.end || "",
          "장소/내용": event.name || "",
          "분류": eventCategory(event),
          "기타 분류": event.categoryCustom || "",
          "예산(페소)": Number(event.budget || 0),
        }));
      const workbook = XLSX.utils.book_new();
      const sheet = XLSX.utils.json_to_sheet(rows, { header: ["일차", "시작", "종료", "장소/내용", "분류", "기타 분류", "예산(페소)"] });
      sheet["!cols"] = [{ wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 34 }, { wch: 12 }, { wch: 14 }, { wch: 14 }];
      XLSX.utils.book_append_sheet(workbook, sheet, "일정");
      XLSX.writeFile(workbook, `clark-schedule-${excelDateStamp()}.xlsx`);
    })
    .catch(() => alert("엑셀 기능을 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요."));
}

async function importScheduleExcel(file) {
  try {
    const XLSX = await loadXlsx();
    const workbook = await readWorkbook(file);
    const sheet = workbook.Sheets["일정"] || workbook.Sheets[workbook.SheetNames[0]];
    const rows = sheetJson(XLSX, sheet);
    const imported = rows
      .map((row, index) => {
        const name = textCell(cellValue(row, ["장소/내용", "일정명", "항목", "name"]));
        if (!name) return null;
        const categoryRaw = textCell(cellValue(row, ["분류", "category"]));
        const category = eventCategories.includes(categoryRaw) ? categoryRaw : "기타";
        return {
          id: `event-${Date.now()}-${index + 1}`,
          day: dayCell(cellValue(row, ["일차", "day"])),
          start: textCell(cellValue(row, ["시작", "start"])),
          end: textCell(cellValue(row, ["종료", "end"])),
          name,
          category,
          categoryCustom: category === "기타" ? textCell(cellValue(row, ["기타 분류", "categoryCustom"])) || (eventCategories.includes(categoryRaw) ? "" : categoryRaw) : "",
          budget: numberCell(cellValue(row, ["예산(페소)", "예산", "budget"])),
        };
      })
      .filter(Boolean);
    if (!imported.length) {
      alert("가져올 일정이 없습니다. '일정' 시트의 장소/내용 컬럼을 확인해 주세요.");
      return;
    }
    const maxDay = Math.max(...imported.map((event) => Number(event.day) || 1));
    const resizeTrip = confirm(
      `엑셀의 일정 ${imported.length}개로 현재 일정 항목을 교체할까요?\n\n` +
      `확인: 여행 일수를 엑셀의 최대 일차(${maxDay}일)로 맞춥니다.\n` +
      `취소: 업로드를 중단합니다.`
    );
    if (!resizeTrip) return;
    events = imported;
    const previousTripNights = trip.nights;
    trip.days = maxDay;
    trip.nights = Math.max(0, trip.days - 1);
    syncTripDates();
    syncLodgingNightsWithTrip(previousTripNights);
    saveEvents();
    saveTrip();
    state.day = String(Math.min(Number(state.day) || 1, trip.days));
    renderTrip();
    renderTimeline();
    renderLodging();
    renderSpend();
  } catch (error) {
    console.error(error);
    alert("엑셀 파일을 읽지 못했습니다. .xlsx 파일인지 확인해 주세요.");
  }
}

function exportSpendExcel() {
  loadXlsx()
    .then((XLSX) => {
      const workbook = XLSX.utils.book_new();
      const extraRows = extraSpends.map((item) => ({
        "항목": item.name || "",
        "결제 구분": spendPaymentOf(item) === "onsite" ? "현지결제" : "선결제",
        "분류": eventCategories.includes(item.category) ? item.category : "기타",
        "통화": spendCurrencyOf(item),
        "금액": Number(item.amount || 0),
      }));
      const allRows = spendItems()
        .filter((item) => item.amount > 0)
        .sort((a, b) => a.day - b.day || String(a.category).localeCompare(String(b.category)))
        .map((item) => ({
          "일차": item.day ? `${item.day}일차` : item.prepaid ? "선결제" : "공통/추가",
          "항목": item.name,
          "분류": item.category,
          "페소(₱)": Math.round(item.amount),
          "원(₩)": Math.round(item.amount * rates.phpToKrw),
          "달러($)": Number((rates.phpPerUsd > 0 ? item.amount / rates.phpPerUsd : 0).toFixed(2)),
        }));
      const extraSheet = XLSX.utils.json_to_sheet(extraRows, { header: ["항목", "결제 구분", "분류", "통화", "금액"] });
      extraSheet["!cols"] = [{ wch: 34 }, { wch: 12 }, { wch: 12 }, { wch: 10 }, { wch: 14 }];
      const allSheet = XLSX.utils.json_to_sheet(allRows, { header: ["일차", "항목", "분류", "페소(₱)", "원(₩)", "달러($)"] });
      allSheet["!cols"] = [{ wch: 12 }, { wch: 34 }, { wch: 12 }, { wch: 14 }, { wch: 14 }, { wch: 12 }];
      const guideSheet = XLSX.utils.aoa_to_sheet([
        ["지출 업로드 안내"],
        ["업로드는 '추가지출' 시트만 반영됩니다."],
        ["'전체지출' 시트는 일정, 골프, 추가 지출을 합산한 참고용입니다."],
        ["일정 예산은 일정 탭의 엑셀 업로드로 수정하세요."],
      ]);
      guideSheet["!cols"] = [{ wch: 60 }];
      XLSX.utils.book_append_sheet(workbook, guideSheet, "안내");
      XLSX.utils.book_append_sheet(workbook, extraSheet, "추가지출");
      XLSX.utils.book_append_sheet(workbook, allSheet, "전체지출");
      XLSX.writeFile(workbook, `clark-spend-${excelDateStamp()}.xlsx`);
    })
    .catch(() => alert("엑셀 기능을 불러오지 못했습니다. 인터넷 연결을 확인한 뒤 다시 시도해 주세요."));
}

async function importSpendExcel(file) {
  try {
    const XLSX = await loadXlsx();
    const workbook = await readWorkbook(file);
    const sheet = workbook.Sheets["추가지출"];
    if (!sheet) {
      alert("'추가지출' 시트가 있는 지출 엑셀 파일만 업로드할 수 있습니다. '전체지출' 시트는 참고용입니다.");
      return;
    }
    const rows = sheetJson(XLSX, sheet);
    const imported = rows
      .map((row, index) => {
        const name = textCell(cellValue(row, ["항목", "name"]));
        const amount = numberCell(cellValue(row, ["금액", "amount"]));
        if (!name && !amount) return null;
        return {
          id: `spend-${Date.now()}-${index + 1}`,
          name,
          pay: paymentCode(cellValue(row, ["결제 구분", "pay"])),
          category: categoryCell(cellValue(row, ["분류", "category"])),
          currency: currencyCode(cellValue(row, ["통화", "currency"])),
          amount,
        };
      })
      .filter(Boolean);
    if (!imported.length) {
      alert("가져올 지출이 없습니다. '추가지출' 시트의 항목/금액 컬럼을 확인해 주세요.");
      return;
    }
    if (!confirm(`엑셀의 추가 지출 ${imported.length}개로 현재 추가 지출 목록을 교체할까요?`)) return;
    extraSpends = imported;
    saveExtraSpends();
    renderExtraSpends();
    renderSpend();
  } catch (error) {
    console.error(error);
    alert("엑셀 파일을 읽지 못했습니다. .xlsx 파일인지 확인해 주세요.");
  }
}

exportScheduleButton?.addEventListener("click", exportScheduleExcel);
importScheduleButton?.addEventListener("click", () => scheduleExcelInput?.click());
scheduleExcelInput?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importScheduleExcel(file);
  scheduleExcelInput.value = "";
});
exportSpendButton?.addEventListener("click", exportSpendExcel);
importSpendButton?.addEventListener("click", () => spendExcelInput?.click());
spendExcelInput?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importSpendExcel(file);
  spendExcelInput.value = "";
});

memoField.addEventListener("input", () => {
  memoHtml = memoField.innerHTML;
  saveMemo();
});

memoField.addEventListener("paste", (event) => {
  const items = [...(event.clipboardData?.items || [])];
  const imageItem = items.find((item) => item.type.startsWith("image/"));
  if (!imageItem) return;
  const file = imageItem.getAsFile();
  if (!file) return;
  event.preventDefault();
  readImageResized(file)
    .then((src) => {
      insertImageAtCursor(src);
      memoHtml = memoField.innerHTML;
      saveMemo();
    })
    .catch(() => alert("이미지를 붙여넣지 못했습니다."));
});

document.querySelectorAll(".top-tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    history.replaceState(null, "", state.view === "guide" ? location.pathname : `#${state.view}`);
    renderView();
  });
});

ratePhpKrw.addEventListener("input", () => {
  const value = Number(ratePhpKrw.value);
  rates.phpToKrw = value > 0 ? value : 0;
  rates.krwPerUsd = rates.phpToKrw > 0 && rates.phpPerUsd > 0 ? rates.phpToKrw * rates.phpPerUsd : 0;
  rates.updatedAt = "";
  saveRates();
  ratesUpdated.textContent = "직접 입력 또는 자동 갱신";
  renderRates();
  renderLodging();
  renderExtraSpends();
  renderSpend();
  renderGolf();
});

rateKrwUsd.addEventListener("input", () => {
  const value = Number(rateKrwUsd.value);
  rates.krwPerUsd = value > 0 ? value : 0;
  rates.phpToKrw = rates.krwPerUsd > 0 && rates.phpPerUsd > 0 ? rates.krwPerUsd / rates.phpPerUsd : 0;
  rates.updatedAt = "";
  saveRates();
  ratesUpdated.textContent = "직접 입력 또는 자동 갱신";
  renderRates();
  renderLodging();
  renderExtraSpends();
  renderSpend();
  renderGolf();
});

ratePhpUsd.addEventListener("input", () => {
  const value = Number(ratePhpUsd.value);
  rates.phpPerUsd = value > 0 ? value : 0;
  rates.krwPerUsd = rates.phpToKrw > 0 && rates.phpPerUsd > 0 ? rates.phpToKrw * rates.phpPerUsd : 0;
  rates.updatedAt = "";
  saveRates();
  ratesUpdated.textContent = "직접 입력 또는 자동 갱신";
  renderRates();
  renderLodging();
  renderExtraSpends();
  renderSpend();
  renderGolf();
});

fetchRatesButton.addEventListener("click", fetchRates);

function applyLodgingField(target) {
  const field = target.id;
  if (field === "lodgingNightly") lodging.nightly = Math.max(0, Number(target.value) || 0);
  if (field === "lodgingPeople") lodging.people = Math.max(1, Math.min(60, Math.round(Number(target.value) || 1)));
  if (field === "lodgingNights") lodging.nights = Math.max(0, Math.min(60, Math.round(Number(target.value) || 0)));
  if (field === "lodgingCurrency") lodging.currency = spendCurrencies.includes(target.value) ? target.value : defaultLodging.currency;
  saveLodging();
  renderTrip();
  renderLodging();
  renderSpend();
}

[lodgingNightly, lodgingPeople, lodgingNights].forEach((input) => {
  input.addEventListener("input", (event) => applyLodgingField(event.target));
});

lodgingCurrency.addEventListener("change", (event) => applyLodgingField(event.target));

function findExtraSpend(target) {
  const card = target.closest(".spend-item");
  return card ? extraSpends.find((item) => item.id === card.dataset.spendId) : null;
}

addSpendButton.addEventListener("click", () => {
  const id = `spend-${Date.now()}-${extraSpends.length + 1}`;
  extraSpends.push({ id, name: "", category: "기타", currency: "KRW", amount: 0, pay: "onsite" });
  saveExtraSpends();
  renderExtraSpends();
  renderSpend();
  requestAnimationFrame(() => {
    document.querySelector(`[data-spend-id="${CSS.escape(id)}"] .spend-item__name`)?.focus();
  });
});

extraSpendList.addEventListener("input", (event) => {
  const field = event.target.dataset.spendField;
  if (field !== "name" && field !== "amount") return; // 분류·통화 select는 change에서 처리
  const item = findExtraSpend(event.target);
  if (!item) return;
  item[field] = field === "amount" ? Number(event.target.value || 0) : event.target.value;
  saveExtraSpends();
  if (field === "amount") {
    const php = toPhp(item.amount, spendCurrencyOf(item));
    const conv = event.target.closest(".spend-item").querySelector(".spend-item__conv");
    if (conv) conv.textContent = `≈ ${phpText(php)} · ${krwText(php)} · ${usdText(php)}`;
  }
  renderSpend();
});

extraSpendList.addEventListener("change", (event) => {
  const field = event.target.dataset.spendField;
  if (field !== "category" && field !== "currency" && field !== "pay") return;
  const item = findExtraSpend(event.target);
  if (!item) return;
  item[field] = event.target.value;
  saveExtraSpends();
  renderExtraSpends();
  renderSpend();
});

extraSpendList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-spend");
  if (!button) return;
  const item = findExtraSpend(button);
  if (!item) return;
  if (!confirm(`${item.name || "이 항목"}을(를) 삭제할까요?`)) return;
  extraSpends = extraSpends.filter((entry) => entry.id !== item.id);
  saveExtraSpends();
  renderExtraSpends();
  renderSpend();
});

// 골프는 일정·지출에도 반영되므로 변경 시 함께 다시 그린다.
function renderGolfLinked() {
  renderGolf();
  renderTimeline();
  renderSpend();
}

golfPeople.addEventListener("change", () => {
  golf.people = Number(golfPeople.value) || 4;
  saveGolf();
  renderGolfLinked();
});

addRoundButton.addEventListener("click", () => {
  const id = nextId("round", golf.rounds);
  golf.rounds.push({ id, course: golfCourses[0].id, day: "주말", tripDay: 1, time: "" });
  saveGolf();
  renderGolfLinked();
  requestAnimationFrame(() => {
    document.querySelector(`[data-round-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
});

function applyGolfRoundField(target) {
  const field = target.dataset.golfField;
  const card = target.closest(".golf-round");
  if (!field || !card) return;
  const round = golf.rounds.find((item) => item.id === card.dataset.roundId);
  if (!round) return;
  round[field] = field === "tripDay" ? Math.max(1, Math.round(Number(target.value) || 1)) : target.value;
  saveGolf();
  renderTimeline();
  renderSpend();
}

golfRounds.addEventListener("change", (event) => {
  if (event.target.dataset.golfField) applyGolfRoundField(event.target);
});

golfRounds.addEventListener("input", (event) => {
  // 일정 일차·시간은 텍스트 입력이라 입력 즉시 반영 (재렌더로 라운드 카드 자체는 건드리지 않음)
  if (["tripDay", "time"].includes(event.target.dataset.golfField)) applyGolfRoundField(event.target);
});

golfRounds.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-round");
  if (!button) return;
  const card = button.closest(".golf-round");
  const index = golf.rounds.findIndex((item) => item.id === card.dataset.roundId);
  if (index < 0) return;
  if (!confirm(`라운드 ${index + 1}을(를) 삭제할까요?`)) return;
  golf.rounds.splice(index, 1);
  saveGolf();
  renderGolfLinked();
});

// 요금표 직접 수정 — 입력 즉시 저장하고 라운드/합계/일정/지출에 반영 (표 자체는 다시 그리지 않아 커서 유지)
golfRefTable.addEventListener("input", (event) => {
  const input = event.target.closest("[data-course][data-field]");
  if (!input) return;
  const id = input.dataset.course;
  const field = input.dataset.field;
  if (!golfCourses.some((course) => course.id === id)) return;
  const edits = golf.courseEdits[id] ? { ...golf.courseEdits[id] } : {};
  if (field === "name") {
    edits.name = input.value;
  } else {
    const value = Number(input.value);
    edits[field] = Number.isFinite(value) ? value : 0;
  }
  golf.courseEdits[id] = edits;
  saveGolf();
  renderGolfRounds();
  renderGolfSummary();
  renderTimeline();
  renderSpend();
});

golfRefTable.addEventListener("click", (event) => {
  if (!event.target.closest("#resetCoursesButton")) return;
  if (!confirm("요금표를 기본값으로 되돌릴까요? 수정한 요금이 모두 사라집니다.")) return;
  golf.courseEdits = {};
  saveGolf();
  renderGolfLinked();
});

saveTripButton.addEventListener("click", saveCurrentTrip);
openSavedButton.addEventListener("click", openSavedDialog);
closeSavedButton.addEventListener("click", () => savedDialog.close());
setCloudCodeButton?.addEventListener("click", setCloudCode);
clearCloudCodeButton?.addEventListener("click", clearCloudCode);
// 백드롭(다이얼로그 바깥) 클릭 시 닫기
savedDialog.addEventListener("click", (event) => {
  if (event.target === savedDialog) savedDialog.close();
});
savedList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-saved-action]");
  if (!button) return;
  const id = button.closest(".saved-item")?.dataset.id;
  if (!id) return;
  const action = button.dataset.savedAction;
  if (action === "load") loadTripSnapshot(id);
  else if (action === "rename") renameTripSnapshot(id);
  else if (action === "delete") deleteTripSnapshot(id);
});
resetButton.addEventListener("click", resetData);
pdfButton.addEventListener("click", () => window.print());
exportBackupButton?.addEventListener("click", exportBackup);
importBackupButton?.addEventListener("click", () => backupInput?.click());
backupInput?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importBackup(file);
  backupInput.value = "";
});

// PDF(인쇄) 시: 모든 탭 내용을 펼쳐 보이고, 메모/텍스트 칸이 잘리지 않도록 높이를 늘린다.
let printTextareaHeights = null;
window.addEventListener("beforeprint", () => {
  document.querySelectorAll(".guide-view, .spend-view, .golf-view, .notes-view").forEach((element) => element.classList.remove("is-hidden"));
  const textareas = [...document.querySelectorAll("textarea")];
  printTextareaHeights = textareas.map((field) => field.style.height);
  textareas.forEach((field) => {
    field.style.height = "auto";
    field.style.height = `${field.scrollHeight}px`;
  });
});
window.addEventListener("afterprint", () => {
  const textareas = [...document.querySelectorAll("textarea")];
  if (printTextareaHeights) {
    textareas.forEach((field, index) => {
      field.style.height = printTextareaHeights[index] || "";
    });
  }
  printTextareaHeights = null;
  renderView();
});

renderAll();
