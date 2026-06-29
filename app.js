// === 환율 (원·달러·페소 모두 표기) ===
// phpToKrw: 1페소당 원화, phpToUsd: 1페소당 달러. 지출 탭에서 직접 입력하거나 자동 갱신.
const defaultRates = { phpToKrw: 26.675, phpToUsd: 0.0177, updatedAt: "" };

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
  // day = 주중/주말, tripDay = 며칠차 일정에 넣을지
  rounds: [
    { id: "round-1", course: "Luisita", day: "주말", tripDay: 2 },
    { id: "round-2", course: "Pradera_May", day: "주말", tripDay: 3 },
    { id: "round-3", course: "Korea", day: "주중", tripDay: 4 },
  ],
};

const eventStorageKey = "clark-events-v1";
const memoHtmlStorageKey = "clark-memo-html-v2"; // v2: 메모 기본값을 빈 내용으로 초기화
const golfStorageKey = "clark-golf-v1";
const tripStorageKey = "clark-trip-v1";
const ratesStorageKey = "clark-rates-v1";
const extraSpendStorageKey = "clark-extra-spend-v1";

const state = {
  day: "1",
  view: location.hash === "#spend" ? "spend" : location.hash === "#golf" ? "golf" : location.hash === "#notes" ? "notes" : "guide",
};

let events = loadStoredArray(eventStorageKey);
if (!events.length) events = baseEvents.map((event, index) => ({ ...event, id: `event-${index + 1}` }));
let memoHtml = localStorage.getItem(memoHtmlStorageKey) || "";
let trip = loadTrip();
let golf = loadGolf();
let rates = loadRates();
let extraSpends = loadStoredArray(extraSpendStorageKey);

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

function loadGolf() {
  const stored = loadStoredObject(golfStorageKey);
  const people = [2, 3, 4].includes(Number(stored.people)) ? Number(stored.people) : defaultGolf.people;
  const rounds = Array.isArray(stored.rounds) && stored.rounds.length
    ? stored.rounds.map((round, index) => ({
        id: round.id || `round-${index + 1}`,
        course: golfCourses.some((course) => course.id === round.course) ? round.course : golfCourses[0].id,
        day: round.day === "주중" ? "주중" : "주말",
        tripDay: Number(round.tripDay) >= 1 ? Math.round(Number(round.tripDay)) : 1,
      }))
    : defaultGolf.rounds.map((round) => ({ ...round }));
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
  return {
    phpToKrw: Number(stored.phpToKrw) > 0 ? Number(stored.phpToKrw) : defaultRates.phpToKrw,
    phpToUsd: Number(stored.phpToUsd) > 0 ? Number(stored.phpToUsd) : defaultRates.phpToUsd,
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
const tripNights = document.querySelector("#tripNights");
const tripDays = document.querySelector("#tripDays");
const tripDates = document.querySelector("#tripDates");
const importPdfButton = document.querySelector("#importPdfButton");
const pdfInput = document.querySelector("#pdfInput");
const memoField = document.querySelector("#memoNotes");
const ratePhpKrw = document.querySelector("#ratePhpKrw");
const ratePhpUsd = document.querySelector("#ratePhpUsd");
const fetchRatesButton = document.querySelector("#fetchRatesButton");
const ratesUpdated = document.querySelector("#ratesUpdated");
const spendSummary = document.querySelector("#spendSummary");
const spendBreakdown = document.querySelector("#spendBreakdown");
const extraSpendList = document.querySelector("#extraSpendList");
const addSpendButton = document.querySelector("#addSpendButton");
const golfPeople = document.querySelector("#golfPeople");
const golfRounds = document.querySelector("#golfRounds");
const golfSummary = document.querySelector("#golfSummary");
const golfRefTable = document.querySelector("#golfRefTable");
const addRoundButton = document.querySelector("#addRoundButton");
const exportButton = document.querySelector("#exportButton");
const importButton = document.querySelector("#importButton");
const importInput = document.querySelector("#importInput");
const resetButton = document.querySelector("#resetButton");
const pdfButton = document.querySelector("#pdfButton");

// === 금액 표기 (페소·원·달러) ===
function phpText(value) {
  return `₱${Math.round(value).toLocaleString("ko-KR")}`;
}

function krwText(value) {
  return `₩${Math.round(value * rates.phpToKrw).toLocaleString("ko-KR")}`;
}

function usdText(value) {
  return `$${(value * rates.phpToUsd).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
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

// 선결제 등 통화별 금액을 페소 기준으로 환산 (KRW/USD → PHP)
const spendCurrencies = ["KRW", "PHP", "USD"];

function spendCurrencyOf(item) {
  return spendCurrencies.includes(item.currency) ? item.currency : "KRW";
}

function toPhp(amount, currency) {
  const value = Number(amount || 0);
  if (currency === "PHP") return value;
  if (currency === "USD") return rates.phpToUsd > 0 ? value / rates.phpToUsd : 0;
  return rates.phpToKrw > 0 ? value / rates.phpToKrw : 0;
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

// === 일정(타임라인) ===
function eventKind(event) {
  const text = event.name.toLowerCase();
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
    card.innerHTML = `
      <div class="event-main">
        <div class="event-editor">
          <label class="inline-field event-name-input">
            <span>장소 / 내용</span>
            <input data-event-field="name" aria-label="일정명" value="${html(event.name)}" />
          </label>
          <label class="inline-field">
            <span>시작</span>
            <input data-event-field="start" aria-label="시작 시간" placeholder="10:00" value="${html(event.start || "")}" />
          </label>
          <label class="inline-field">
            <span>종료</span>
            <input data-event-field="end" aria-label="종료 시간" placeholder="11:00" value="${html(event.end || "")}" />
          </label>
          <label class="inline-field event-cat">
            <span>분류</span>
            <select data-event-field="category" aria-label="지출 분류">${categoryOptions}</select>
          </label>
        </div>
        <div class="meta">${html(category)} · ${event.budget ? "예산 포함" : "이동/숙소"}</div>
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
        <div class="golf-event__title">⛳ 골프 · ${html(breakdown.course.name)} <small>${html(round.day)}</small></div>
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
  tripDates.textContent = trip.startDate
    ? `✈️ ${trip.startDate}(${isoDowKr(trip.startDate)}) 출국 ~ ${trip.endDate}(${isoDowKr(trip.endDate)}) 귀국 · ${trip.nights}박 ${trip.days}일`
    : "";
  renderDaySegments();
}

// === 지출 내역 (페소·원·달러) — 일정 항목 + 골프(1인 기준)를 합산 ===
// 골프 비용은 1인 합계를 해당 라운드의 일정 일차에 배정한다.
function spendItems() {
  const fromEvents = events.map((event) => ({
    name: event.name || "(이름 없음)",
    day: Number(event.day) || 0,
    category: eventCategory(event),
    amount: Number(event.budget || 0),
  }));
  const fromGolf = golf.rounds.map((round) => {
    const breakdown = golfRoundBreakdown(round, golf.people);
    return {
      name: `⛳ ${breakdown.course.name} (${round.day})`,
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
  }));
  return [...fromEvents, ...fromGolf, ...fromExtra];
}

function spendRows(map) {
  return [...map.entries()].map(([key, value]) => ({ key, value }));
}

function renderSpend() {
  const items = spendItems();
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  spendSummary.innerHTML = `
    <span class="spend-total-bar__label">전체 예상 지출 (일정 + 골프)</span>
    <span class="spend-total-bar__amounts"><strong>${phpText(total)}</strong> · ${krwText(total)} · ${usdText(total)}</span>
  `;

  const byCategory = new Map();
  eventCategories.forEach((category) => {
    const sum = items.filter((item) => item.category === category).reduce((acc, item) => acc + item.amount, 0);
    if (sum > 0) byCategory.set(category, sum);
  });

  const byDay = new Map();
  items.forEach((item) => byDay.set(item.day, (byDay.get(item.day) || 0) + item.amount));
  const days = [...byDay.keys()].sort((a, b) => a - b);

  const detailRows = items
    .filter((item) => item.amount > 0)
    .sort((a, b) => a.day - b.day || b.amount - a.amount);

  const moneyCells = (value) => `<td>${phpText(value)}</td><td>${krwText(value)}</td><td>${usdText(value)}</td>`;

  spendBreakdown.innerHTML = `
    <h3 class="spend-heading">카테고리별</h3>
    <table>
      <thead><tr><th>분류</th><th>페소(₱)</th><th>원(₩)</th><th>달러($)</th></tr></thead>
      <tbody>
        ${spendRows(byCategory).map((row) => `<tr><td class="golf-ref__name">${html(row.key)}</td>${moneyCells(row.value)}</tr>`).join("")}
        <tr class="spend-total-row"><td class="golf-ref__name">합계</td>${moneyCells(total)}</tr>
      </tbody>
    </table>

    <h3 class="spend-heading">일차별</h3>
    <table>
      <thead><tr><th>일차</th><th>페소(₱)</th><th>원(₩)</th><th>달러($)</th></tr></thead>
      <tbody>
        ${days.map((day) => `<tr><td class="golf-ref__name">${day ? `${day}일차` : "선결제"}</td>${moneyCells(byDay.get(day))}</tr>`).join("")}
        <tr class="spend-total-row"><td class="golf-ref__name">합계</td>${moneyCells(total)}</tr>
      </tbody>
    </table>

    <h3 class="spend-heading">항목별</h3>
    <table>
      <thead><tr><th>일차</th><th>항목</th><th>분류</th><th>페소(₱)</th><th>원(₩)</th><th>달러($)</th></tr></thead>
      <tbody>
        ${detailRows.map((item) => `<tr><td>${item.day ? `${item.day}일차` : "선결제"}</td><td class="golf-ref__name">${html(item.name)}</td><td>${html(item.category)}</td>${moneyCells(item.amount)}</tr>`).join("")}
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

  extraSpendList.innerHTML = extraSpends.map((item) => {
    const currency = spendCurrencyOf(item);
    const php = toPhp(item.amount, currency);
    const category = eventCategories.includes(item.category) ? item.category : "기타";
    return `
      <div class="spend-item" data-spend-id="${html(item.id)}">
        <input class="spend-item__name" data-spend-field="name" aria-label="항목" placeholder="예: 항공료, 숙소 선결제" value="${html(item.name || "")}" />
        <select data-spend-field="category" aria-label="분류">${categoryOptions(category)}</select>
        <select data-spend-field="currency" aria-label="통화">${currencyOptions(currency)}</select>
        <input class="spend-item__amount" data-spend-field="amount" inputmode="numeric" aria-label="금액" value="${html(item.amount || "")}" />
        <span class="spend-item__conv">≈ ${phpText(php)} · ${krwText(php)} · ${usdText(php)}</span>
        <button class="delete-inline delete-spend" type="button" aria-label="삭제">×</button>
      </div>
    `;
  }).join("");

  if (!extraSpends.length) {
    extraSpendList.innerHTML = `<p class="meta">미리 결제한 항공료·숙소·골프 등을 "추가"로 넣으면 지출 합계에 반영됩니다.</p>`;
  }
}

// === 환율 ===
function renderRates() {
  if (document.activeElement !== ratePhpKrw) ratePhpKrw.value = String(rates.phpToKrw);
  if (document.activeElement !== ratePhpUsd) ratePhpUsd.value = String(rates.phpToUsd);
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
    rates.phpToUsd = data.rates.USD;
    rates.updatedAt = data.time_last_update_utc || new Date().toLocaleString("ko-KR");
    saveRates();
    renderRates();
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
  renderExtraSpends();
  renderSpend();
  renderGolf();
  renderView();
}

// === 백업 / 가져오기 / 초기화 ===
const backupKeys = [eventStorageKey, memoHtmlStorageKey, golfStorageKey, tripStorageKey, ratesStorageKey, extraSpendStorageKey];

function exportData() {
  const data = { version: 2, exportedAt: new Date().toISOString() };
  backupKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value != null) data[key] = value;
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `clark-planner-backup-${stamp}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let data;
    try {
      data = JSON.parse(reader.result);
    } catch {
      alert("백업 파일을 읽을 수 없습니다. JSON 형식이 맞는지 확인해 주세요.");
      return;
    }
    if (!data || typeof data !== "object") {
      alert("백업 파일 형식이 올바르지 않습니다.");
      return;
    }
    const hasAny = backupKeys.some((key) => typeof data[key] === "string");
    if (!hasAny) {
      alert("이 앱의 백업 파일이 아닌 것 같습니다.");
      return;
    }
    if (!confirm("현재 편집 내용을 백업 파일 내용으로 덮어쓸까요?")) return;
    backupKeys.forEach((key) => {
      if (typeof data[key] === "string") localStorage.setItem(key, data[key]);
    });
    location.reload();
  };
  reader.readAsText(file);
}

function resetData() {
  if (!confirm("모든 편집 내용을 지우고 기본값으로 되돌릴까요? 되돌릴 수 없습니다.")) return;
  backupKeys.forEach((key) => localStorage.removeItem(key));
  location.reload();
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

tripNights.addEventListener("input", () => {
  const nights = Math.max(0, Math.min(60, Math.round(Number(tripNights.value) || 0)));
  trip.nights = nights;
  trip.days = nights + 1;
  tripDays.value = String(trip.days);
  syncTripDates();
  saveTrip();
  renderTrip();
  renderTimeline();
});

tripDays.addEventListener("input", () => {
  const days = Math.max(1, Math.min(60, Math.round(Number(tripDays.value) || 1)));
  trip.days = days;
  trip.nights = Math.max(0, days - 1);
  tripNights.value = String(trip.nights);
  syncTripDates();
  saveTrip();
  renderTrip();
  renderTimeline();
});

// === 여정안내서(PDF) 자동 인식 ===
let pdfjsPromise = null;
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfjsPromise) return pdfjsPromise;
  pdfjsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      if (!window.pdfjsLib) return reject(new Error("pdfjs"));
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error("pdfjs"));
    document.head.appendChild(script);
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

    trip.startDate = result.startDate;
    trip.endDate = result.endDate;
    trip.days = result.days;
    trip.nights = result.nights;
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
  } else if (field === "budget") {
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
  rates.updatedAt = "";
  saveRates();
  ratesUpdated.textContent = "직접 입력 또는 자동 갱신";
  renderExtraSpends();
  renderSpend();
  renderGolf();
});

ratePhpUsd.addEventListener("input", () => {
  const value = Number(ratePhpUsd.value);
  rates.phpToUsd = value > 0 ? value : 0;
  rates.updatedAt = "";
  saveRates();
  ratesUpdated.textContent = "직접 입력 또는 자동 갱신";
  renderExtraSpends();
  renderSpend();
  renderGolf();
});

fetchRatesButton.addEventListener("click", fetchRates);

function findExtraSpend(target) {
  const card = target.closest(".spend-item");
  return card ? extraSpends.find((item) => item.id === card.dataset.spendId) : null;
}

addSpendButton.addEventListener("click", () => {
  const id = `spend-${Date.now()}-${extraSpends.length + 1}`;
  extraSpends.push({ id, name: "", category: "기타", currency: "KRW", amount: 0 });
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
  if (field !== "category" && field !== "currency") return;
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
  golf.rounds.push({ id, course: golfCourses[0].id, day: "주말", tripDay: 1 });
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
  // 일정 일차는 숫자 입력이라 입력 즉시 반영 (재렌더로 라운드 카드 자체는 건드리지 않음)
  if (event.target.dataset.golfField === "tripDay") applyGolfRoundField(event.target);
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

exportButton.addEventListener("click", exportData);
importButton.addEventListener("click", () => importInput.click());
importInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (file) importData(file);
  importInput.value = "";
});
resetButton.addEventListener("click", resetData);
pdfButton.addEventListener("click", () => window.print());

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
