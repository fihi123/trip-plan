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
// cart2/cart3/cart4 = 인원수(2/3/4)에 따른 1인당 카트 비용
const golfCourses = [
  { id: "SunValley_General", name: "썬밸리(일반)", season: "4.1~", weekday: 3000, weekend: 3500, caddy: 700, cart2: 750, cart3: 1000, cart4: 750, insurance: 150, consumable: 0 },
  { id: "SunValley_Member", name: "썬밸리(멤버)", season: "4.1~", weekday: 3300, weekend: 3800, caddy: 700, cart2: 750, cart3: 1000, cart4: 750, insurance: 150, consumable: 0 },
  { id: "Korea", name: "코리아", season: "3.9~", weekday: 1800, weekend: 2400, caddy: 600, cart2: 1000, cart3: 1333, cart4: 1000, insurance: 150, consumable: 0 },
  { id: "Mimosa", name: "미모사", season: "~3.31", weekday: 4500, weekend: 5500, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, insurance: 0, consumable: 400 },
  { id: "Royal", name: "로얄", season: "3.16~", weekday: 1800, weekend: 2300, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, insurance: 150, consumable: 300 },
  { id: "HanReserve", name: "한리저브", season: "1.10~4.30", weekday: 12500, weekend: 12500, caddy: 0, cart2: 0, cart3: 0, cart4: 0, insurance: 0, consumable: 0 },
  { id: "Pradera_May", name: "프라데라", season: "5.1~", weekday: 2700, weekend: 2700, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, insurance: 150, consumable: 300 },
  { id: "Pradera_Apr", name: "프라데라", season: "4월프로모", weekday: 1500, weekend: 1500, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, insurance: 150, consumable: 300 },
  { id: "Luisita", name: "루이시타", season: "3.16~", weekday: 2000, weekend: 2000, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, insurance: 100, consumable: 300 },
  { id: "Beverly", name: "베버리", season: "3.16~", weekday: 1400, weekend: 1700, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, insurance: 200, consumable: 300 },
  { id: "NewAsia", name: "뉴아시아", season: "3.16~", weekday: 1200, weekend: 1200, caddy: 600, cart2: 750, cart3: 1000, cart4: 750, insurance: 150, consumable: 0 },
  { id: "Lakewood", name: "레이크우드", season: "3.16~", weekday: 1000, weekend: 1000, caddy: 600, cart2: 800, cart3: 1067, cart4: 800, insurance: 0, consumable: 0 },
  { id: "Subic", name: "수빅CC", season: "~3.31", weekday: 6800, weekend: 10800, caddy: 0, cart2: 0, cart3: 0, cart4: 0, insurance: 0, consumable: 0 },
];

const defaultGolf = {
  people: 4,
  rounds: [
    { id: "round-1", course: "Luisita", day: "주말" },
    { id: "round-2", course: "Pradera_May", day: "주말" },
    { id: "round-3", course: "Korea", day: "주중" },
  ],
};

const eventStorageKey = "clark-events-v1";
const memoHtmlStorageKey = "clark-memo-html-v2"; // v2: 메모 기본값을 빈 내용으로 초기화
const golfStorageKey = "clark-golf-v1";
const tripStorageKey = "clark-trip-v1";
const ratesStorageKey = "clark-rates-v1";

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
  return { nights, days };
}

function loadGolf() {
  const stored = loadStoredObject(golfStorageKey);
  const people = [2, 3, 4].includes(Number(stored.people)) ? Number(stored.people) : defaultGolf.people;
  const rounds = Array.isArray(stored.rounds) && stored.rounds.length
    ? stored.rounds.map((round, index) => ({
        id: round.id || `round-${index + 1}`,
        course: golfCourses.some((course) => course.id === round.course) ? round.course : golfCourses[0].id,
        day: round.day === "주중" ? "주중" : "주말",
      }))
    : defaultGolf.rounds.map((round) => ({ ...round }));
  return { people, rounds };
}

function loadRates() {
  const stored = loadStoredObject(ratesStorageKey);
  return {
    phpToKrw: Number(stored.phpToKrw) > 0 ? Number(stored.phpToKrw) : defaultRates.phpToKrw,
    phpToUsd: Number(stored.phpToUsd) > 0 ? Number(stored.phpToUsd) : defaultRates.phpToUsd,
    updatedAt: typeof stored.updatedAt === "string" ? stored.updatedAt : "",
  };
}

// === DOM 참조 ===
const timeline = document.querySelector("#timeline");
const daySegments = document.querySelector("#daySegments");
const visibleCount = document.querySelector("#visibleCount");
const addEventButton = document.querySelector("#addEventButton");
const tripNights = document.querySelector("#tripNights");
const tripDays = document.querySelector("#tripDays");
const memoField = document.querySelector("#memoNotes");
const ratePhpKrw = document.querySelector("#ratePhpKrw");
const ratePhpUsd = document.querySelector("#ratePhpUsd");
const fetchRatesButton = document.querySelector("#fetchRatesButton");
const ratesUpdated = document.querySelector("#ratesUpdated");
const spendSummary = document.querySelector("#spendSummary");
const spendBreakdown = document.querySelector("#spendBreakdown");
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

  items.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.kind = eventKind(event);
    card.dataset.eventId = event.id;
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
        </div>
        <div class="meta">${eventKindLabel(event)} · ${event.budget ? "예산 포함" : "이동/숙소"}</div>
      </div>
      <label class="inline-field money-field">
        <span>예산(₱)</span>
        <input class="budget-edit" data-event-field="budget" inputmode="numeric" aria-label="예산" value="${html(event.budget || "")}" />
      </label>
      <button class="delete-inline delete-event" type="button" aria-label="일정 삭제">×</button>
    `;
    timeline.append(card);
  });

  if (!items.length) {
    timeline.innerHTML = `<p class="meta">${state.day}일차 일정이 없습니다. "추가"로 일정을 넣어 보세요.</p>`;
  }
  visibleCount.value = `${items.length}개 항목`;
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
  renderDaySegments();
}

// === 지출 내역 (페소·원·달러) ===
function renderSpend() {
  const grouped = new Map();
  events.forEach((event) => {
    const day = Number(event.day);
    grouped.set(day, (grouped.get(day) || 0) + Number(event.budget || 0));
  });
  const days = [...grouped.keys()].sort((a, b) => a - b);
  const total = events.reduce((sum, event) => sum + Number(event.budget || 0), 0);

  spendSummary.innerHTML = `
    <div class="golf-stat is-grand">
      <span>전체 예상 지출</span>
      <strong>${phpText(total)}</strong>
      <small>${krwText(total)} · ${usdText(total)}</small>
    </div>
  `;

  spendBreakdown.innerHTML = `
    <table>
      <thead>
        <tr><th>일차</th><th>페소(₱)</th><th>원(₩)</th><th>달러($)</th></tr>
      </thead>
      <tbody>
        ${days.map((day) => {
          const value = grouped.get(day);
          return `<tr><td class="golf-ref__name">${day}일차</td><td>${phpText(value)}</td><td>${krwText(value)}</td><td>${usdText(value)}</td></tr>`;
        }).join("")}
        <tr class="spend-total-row"><td class="golf-ref__name">합계</td><td>${phpText(total)}</td><td>${krwText(total)}</td><td>${usdText(total)}</td></tr>
      </tbody>
    </table>
  `;
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
function golfCourse(id) {
  return golfCourses.find((course) => course.id === id) || golfCourses[0];
}

function golfCartPerPerson(course, people) {
  if (people === 2) return course.cart2;
  if (people === 3) return course.cart3;
  return course.cart4;
}

function golfRoundBreakdown(round, people) {
  const course = golfCourse(round.course);
  const greenFee = round.day === "주중" ? course.weekday : course.weekend;
  const caddy = course.caddy;
  const cart = golfCartPerPerson(course, people);
  const extra = course.insurance + course.consumable;
  return { course, greenFee, caddy, cart, extra, total: greenFee + caddy + cart + extra };
}

function renderGolf() {
  const people = golf.people;
  golfPeople.value = String(people);

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

  golfRefTable.innerHTML = `
    <table>
      <thead>
        <tr><th>골프장</th><th>그린피<br>주중</th><th>그린피<br>주말</th><th>캐디</th><th>카트<br>(${people}인)</th><th>보험<br>+컨슈</th></tr>
      </thead>
      <tbody>
        ${golfCourses.map((course) => `
          <tr>
            <td class="golf-ref__name">${html(course.name)} <small>${html(course.season)}</small></td>
            <td>${phpText(course.weekday)}</td>
            <td>${phpText(course.weekend)}</td>
            <td>${course.caddy ? phpText(course.caddy) : "-"}</td>
            <td>${golfCartPerPerson(course, people) ? phpText(golfCartPerPerson(course, people)) : "-"}</td>
            <td>${course.insurance + course.consumable ? phpText(course.insurance + course.consumable) : "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
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
  renderSpend();
  renderGolf();
  renderView();
}

// === 백업 / 가져오기 / 초기화 ===
const backupKeys = [eventStorageKey, memoHtmlStorageKey, golfStorageKey, tripStorageKey, ratesStorageKey];

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
function applyTrip() {
  trip.nights = Math.max(0, Math.min(60, Math.round(Number(tripNights.value) || 0)));
  trip.days = Math.max(1, Math.min(60, Math.round(Number(tripDays.value) || 1)));
  saveTrip();
  renderDaySegments();
  renderTimeline();
}

tripNights.addEventListener("input", () => {
  const nights = Math.max(0, Math.min(60, Math.round(Number(tripNights.value) || 0)));
  trip.nights = nights;
  trip.days = nights + 1;
  tripDays.value = String(trip.days);
  saveTrip();
  renderDaySegments();
  renderTimeline();
});

tripDays.addEventListener("input", () => {
  const days = Math.max(1, Math.min(60, Math.round(Number(tripDays.value) || 1)));
  trip.days = days;
  trip.nights = Math.max(0, days - 1);
  tripNights.value = String(trip.nights);
  saveTrip();
  renderDaySegments();
  renderTimeline();
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
  if (field === "budget") renderSpend();
});

timeline.addEventListener("click", (event) => {
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
  renderSpend();
  renderGolf();
});

ratePhpUsd.addEventListener("input", () => {
  const value = Number(ratePhpUsd.value);
  rates.phpToUsd = value > 0 ? value : 0;
  rates.updatedAt = "";
  saveRates();
  ratesUpdated.textContent = "직접 입력 또는 자동 갱신";
  renderSpend();
  renderGolf();
});

fetchRatesButton.addEventListener("click", fetchRates);

golfPeople.addEventListener("change", () => {
  golf.people = Number(golfPeople.value) || 4;
  saveGolf();
  renderGolf();
});

addRoundButton.addEventListener("click", () => {
  const id = nextId("round", golf.rounds);
  golf.rounds.push({ id, course: golfCourses[0].id, day: "주말" });
  saveGolf();
  renderGolf();
  requestAnimationFrame(() => {
    document.querySelector(`[data-round-id="${CSS.escape(id)}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
});

golfRounds.addEventListener("change", (event) => {
  const field = event.target.dataset.golfField;
  const card = event.target.closest(".golf-round");
  if (!field || !card) return;
  const round = golf.rounds.find((item) => item.id === card.dataset.roundId);
  if (!round) return;
  round[field] = event.target.value;
  saveGolf();
  renderGolf();
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
  renderGolf();
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
