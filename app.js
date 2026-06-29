const exchange = {
  phpToKrw: 26.675,
  phpToUsd: 58,
};

const basePrepItems = [
  { text: "필리핀 eTravel 작성" },
  { text: "스카이호텔 네이버 카페 가입 후 카카오톡으로 일반룸 예약" },
  { text: "환전 방식 결정: 달러로 가져가 현지에서 환전하거나, 한국 머니박스에서 원화를 페소로 환전" },
  { text: "레드스트리트에서는 Aura Bar 또는 코스프레바 위주로만 가기" },
  { text: "첫날 호텔 체크인 후 해운대 술집이나 클럽 팬타곤에서 가볍게 술 한잔. 낯선 사람과 동행할 때는 현지 법규, 명확한 동의, 신분 확인, 개인 안전 우선" },
];

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
  rate: exchange.phpToKrw,
  rounds: [
    { id: "round-1", course: "Luisita", day: "주말" },
    { id: "round-2", course: "Pradera_May", day: "주말" },
    { id: "round-3", course: "Korea", day: "주중" },
  ],
};

const basePlaceDirectory = [
  { name: "자이풀빌라 / XI Pool Villa", category: "숙소", lat: 15.1485277, lng: 120.5695485 },
  { name: "앙헬레스 엠타운 빌리지 하이클래스 풀빌라", category: "숙소", lat: 15.1470851, lng: 120.5680847 },
  { name: "스카이 호텔", category: "숙소", lat: 15.1629129, lng: 120.5560771 },
  { name: "미스진순대국 (Miss Jin Sundae)", aliases: ["미스진 (순대국)"], category: "식당", price: 500, menu: "순대국", lat: 15.1611609, lng: 120.5565816 },
  { name: "양평해장국(YANGPYEONG HAEJANG GUK)", aliases: ["양평해장국"], category: "식당", price: 500, menu: "해장국", lat: 15.1654276, lng: 120.5599499 },
  { name: "서울옥 식당 Seoul Oak Restaurant", aliases: ["서울옥"], category: "식당", price: 2000, lat: 15.1595597, lng: 120.5556932 },
  { name: "Jumong Korean Restaurant", aliases: ["주몽"], category: "식당", price: 2000, lat: 15.1673424, lng: 120.5891529 },
  { name: "김형제 고기의철학 Kim's Brothers", aliases: ["킴스브라더 (A세트, 짜파)"], category: "식당", price: 2000, menu: "A세트, 짜파", lat: 15.1618204, lng: 120.5551456 },
  { name: "크랩앤크랙", aliases: ["crabs and crack"], category: "식당", price: 1500, lat: 15.1602154, lng: 120.5564733 },
  { name: "아지트", aliases: ["아지트 (코끼리조개, 해물찜)", "아지트 (타이거, 조개, 찜)"], category: "식당", price: 3000, menu: "코끼리조개, 해물찜", lat: 15.1603008, lng: 120.5559734 },
  { name: "호텔 식당", category: "식당", price: 500 },
  { name: "미스터 왕 중국식당", category: "식당", lat: 15.1636146, lng: 120.5561858 },
  { name: "따라나 코리안 레스토랑", category: "식당", lat: 15.1672679, lng: 120.5883729 },
  { name: "시크릿가든", category: "식당", lat: 15.1668915, lng: 120.5880152 },
  { name: "해운대 그릴 앤 레스토", category: "식당", lat: 15.1659268, lng: 120.5858595 },
  { name: "재인마사지", aliases: ["마사지 (1H)"], category: "마사지", price: 600, lat: 15.167728, lng: 120.589602 },
  { name: "레드스트리트", category: "밤 일정", price: 6000 },
  { name: "명월 Myeongwol JTV", category: "밤 일정", lat: 15.1591542, lng: 120.5577344 },
  { name: "Club Castle", category: "밤 일정", lat: 15.1665398, lng: 120.5642005 },
  { name: "K-POP Family KTV", category: "밤 일정", lat: 15.1671733, lng: 120.5867619 },
  { name: "알앤비 라이브 카페(Angeles R&B Live Cafe)", aliases: ["R&B or 노래방"], category: "밤 일정", price: 2000, lat: 15.1655466, lng: 120.5601306 },
  { name: "클럽 팬타곤", category: "밤 일정", lat: 15.1637373, lng: 120.5564137 },
  { name: "블루문 다이닝펍&노래방", category: "밤 일정", lat: 15.1616496, lng: 120.5561299 },
  { name: "하루 Haru JTV", category: "밤 일정", lat: 15.1475492, lng: 120.5591932 },
  { name: "SM 시티 클라크", category: "쇼핑", lat: 15.1672708, lng: 120.5801134 },
  { name: "싱싱마트", category: "쇼핑", lat: 15.1608686, lng: 120.5556671 },
  { name: "BDO Angeles-Friendship Highway Branch ATM 1", category: "편의", lat: 15.1603633, lng: 120.5563923 },
  { name: "호텔 라운지", category: "편의", price: 2000 },
  { name: "빨래", category: "편의", price: 300 },
];

const state = {
  day: "all",
  query: "",
  krw: false,
  view: location.hash === "#saved" ? "saved" : location.hash === "#golf" ? "golf" : location.hash === "#notes" ? "notes" : "guide",
  category: "전체",
};

const noteStorageKey = "clark-place-notes-v1";
const placeEditStorageKey = "clark-place-edits-v1";
const deletedPlaceStorageKey = "clark-place-deleted-v1";
const customPlaceStorageKey = "clark-custom-places-v1";
const eventStorageKey = "clark-events-v1";
const prepStorageKey = "clark-prep-items-v1";
const prepNotesStorageKey = "clark-prep-notes-v1";
const remarksStorageKey = "clark-remarks-v1";
const prepImagesStorageKey = "clark-prep-images-v1";
const remarksImagesStorageKey = "clark-remarks-images-v1";
const memoStorageKey = "clark-memo-v1";
const memoImagesStorageKey = "clark-memo-images-v1";
const memoHtmlStorageKey = "clark-memo-html-v1";
const golfStorageKey = "clark-golf-v1";
let placeNotes = loadPlaceNotes();
let placeEdits = loadStoredObject(placeEditStorageKey);
let deletedPlaces = new Set(loadStoredArray(deletedPlaceStorageKey));
let customPlaces = loadStoredArray(customPlaceStorageKey);
let events = loadStoredArray(eventStorageKey);
let memoHtml = loadMemoHtml();
let golf = loadGolf();
if (!events.length) events = baseEvents.map((event, index) => ({ ...event, id: `event-${index + 1}` }));

// 골프 설정: 저장값이 없으면 기본값. 라운드 배열이 비면 기본 라운드로 복원한다.
function loadGolf() {
  const stored = loadStoredObject(golfStorageKey);
  const people = [2, 3, 4].includes(Number(stored.people)) ? Number(stored.people) : defaultGolf.people;
  const rate = Number(stored.rate) > 0 ? Number(stored.rate) : defaultGolf.rate;
  const rounds = Array.isArray(stored.rounds) && stored.rounds.length
    ? stored.rounds.map((round, index) => ({
        id: round.id || `round-${index + 1}`,
        course: golfCourses.some((course) => course.id === round.course) ? round.course : golfCourses[0].id,
        day: round.day === "주중" ? "주중" : "주말",
      }))
    : defaultGolf.rounds.map((round) => ({ ...round }));
  return { people, rate, rounds };
}

function loadPrepNotes() {
  const stored = localStorage.getItem(prepNotesStorageKey);
  if (stored != null) return stored;
  // 예전 체크리스트 데이터가 있으면 텍스트로 옮겨준다.
  const legacy = loadStoredArray(prepStorageKey);
  const source = legacy.length ? legacy : basePrepItems;
  return source.map((item) => `- ${item.text}`).join("\n");
}

// 통합 메모: 새 키가 없으면 기존 "출발 전 메모"와 "특이사항"을 하나로 합쳐 이전한다.
function loadMemoText() {
  const stored = localStorage.getItem(memoStorageKey);
  if (stored != null) return stored;
  const prep = loadPrepNotes();
  const remarks = localStorage.getItem(remarksStorageKey) || "";
  return [prep, remarks].filter(Boolean).join("\n\n");
}

function loadMemoImages() {
  const stored = localStorage.getItem(memoImagesStorageKey);
  if (stored != null) return loadStoredArray(memoImagesStorageKey);
  return [...loadStoredArray(prepImagesStorageKey), ...loadStoredArray(remarksImagesStorageKey)];
}

// 메모를 리치 에디터(붙여넣기/편집)로 전환. 새 HTML 키가 없으면 기존 텍스트 + 첨부 이미지를 HTML로 합쳐 이전한다.
function loadMemoHtml() {
  const stored = localStorage.getItem(memoHtmlStorageKey);
  if (stored != null) return stored;
  const text = loadMemoText();
  const images = loadMemoImages();
  const parts = [];
  if (text) parts.push(`<div>${html(text).replace(/\n/g, "<br>")}</div>`);
  images.forEach((image) => {
    if (image && image.src) parts.push(`<div><img src="${html(image.src)}" alt="" /></div>`);
  });
  return parts.join("");
}
let placeDirectory = buildPlaceDirectory();

const timeline = document.querySelector("#timeline");
const visibleCount = document.querySelector("#visibleCount");
const savedGrid = document.querySelector("#savedGrid");
const categoryStrip = document.querySelector("#categoryStrip");
const addEventButton = document.querySelector("#addEventButton");
const addPlaceButton = document.querySelector("#addPlaceButton");
const memoField = document.querySelector("#memoNotes");
const heroDays = document.querySelector("#heroDays");
const metricSpend = document.querySelector("#metricSpend");
const metricSpendKrw = document.querySelector("#metricSpendKrw");
const exportButton = document.querySelector("#exportButton");
const importButton = document.querySelector("#importButton");
const importInput = document.querySelector("#importInput");
const resetButton = document.querySelector("#resetButton");
const pdfButton = document.querySelector("#pdfButton");
const golfPeople = document.querySelector("#golfPeople");
const golfRate = document.querySelector("#golfRate");
const golfRounds = document.querySelector("#golfRounds");
const golfSummary = document.querySelector("#golfSummary");
const golfRefTable = document.querySelector("#golfRefTable");
const addRoundButton = document.querySelector("#addRoundButton");

function money(value) {
  if (!value) return "";
  if (state.krw) {
    return `₩${Math.round(value * exchange.phpToKrw).toLocaleString("ko-KR")}`;
  }
  return `₱${value.toLocaleString("ko-KR")}`;
}

function phpText(value) {
  return `₱${Math.round(value).toLocaleString("ko-KR")}`;
}

function krwText(value) {
  return `₩${Math.round(value * exchange.phpToKrw).toLocaleString("ko-KR")}`;
}

function eventsTotal() {
  return events.reduce((sum, event) => sum + Number(event.budget || 0), 0);
}

function renderSummary() {
  const spent = eventsTotal();
  const days = new Set(events.map((event) => Number(event.day))).size;
  heroDays.textContent = `${days}일`;
  metricSpend.textContent = phpText(spent);
  metricSpendKrw.textContent = krwText(spent);
}

function html(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function eventKind(event) {
  const text = event.name.toLowerCase();
  if (text.includes("술") || text.includes("클럽") || text.includes("노래방") || text.includes("레드스트리트")) return "night";
  if (text.includes("식당") || text.includes("순대국") || text.includes("해장국") || text.includes("주몽") || text.includes("서울옥") || text.includes("crabs") || text.includes("아지트") || text.includes("킴스")) return "food";
  return "default";
}

function timeText(event) {
  if (!event.start && !event.end) return "시간 미정";
  return `${event.start || ""}${event.end ? ` - ${event.end}` : ""}`;
}

function startMinutes(event) {
  if (!event.start) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(event.start).trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

// 시작 시간 순으로 정렬하되, 밤을 넘기는 일정(예: 21:00 출발 → 다음날 새벽)이
// 깨지지 않도록 그날 첫 시간을 기준점으로 삼아 그보다 이른 시간은 다음날로 본다.
// 시간이 없는 항목은 바로 앞 항목 뒤에 그대로 둔다.
function sortDayEvents(items) {
  let anchor = null;
  for (const event of items) {
    const minutes = startMinutes(event);
    if (minutes != null) {
      anchor = minutes;
      break;
    }
  }
  // 시간 미정인 새 일정은 맨 위로, 그 외 시간 미정 항목은 앞 항목 뒤에 둔다.
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

function filterEvents() {
  return events.filter((event) => {
    const dayMatch = state.day === "all" || String(event.day) === state.day;
    const queryMatch = event.name.toLowerCase().includes(state.query);
    return dayMatch && queryMatch;
  });
}

function saveEvents() {
  localStorage.setItem(eventStorageKey, JSON.stringify(events));
}

function saveCustomPlaces() {
  localStorage.setItem(customPlaceStorageKey, JSON.stringify(customPlaces));
}

function nextId(prefix, collection) {
  return `${prefix}-${Date.now()}-${collection.length + 1}`;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[()\-_/&·,]/g, "");
}

function placeTerms(place) {
  return [place.name, ...(place.aliases || []), ...(place.originalTerms || [])].filter(Boolean);
}

function findPlaceForEvent(event) {
  const eventName = normalizeText(event.name);
  if (!eventName) return null;
  return placeDirectory.find((place) => {
    return placeTerms(place).some((term) => {
      const normalizedTerm = normalizeText(term);
      return normalizedTerm && (eventName === normalizedTerm || eventName.includes(normalizedTerm) || normalizedTerm.includes(eventName));
    });
  }) || null;
}

function eventMatchesPlace(event, place) {
  return findPlaceForEvent(event)?.id === place.id;
}

function scheduleForPlace(place) {
  return events.filter((event) => eventMatchesPlace(event, place));
}

function renderTimeline() {
  const visible = filterEvents();
  const grouped = Map.groupBy ? Map.groupBy(visible, (event) => event.day) : groupByDay(visible);
  const days = [...grouped.keys()].sort((a, b) => Number(a) - Number(b));
  timeline.innerHTML = "";

  for (const day of days) {
    const items = sortDayEvents(grouped.get(day));
    const total = items.reduce((sum, event) => sum + Number(event.budget || 0), 0);
    const group = document.createElement("section");
    group.className = "day-group";
    group.innerHTML = `
      <div class="day-heading">
        <span>${day}일차</span>
        <span>${money(total) || "지출 없음"}</span>
      </div>
    `;

    items.forEach((event) => {
      const matchedPlace = findPlaceForEvent(event);
      const note = matchedPlace ? getPlaceNote(matchedPlace) : {};
      const card = document.createElement("article");
      card.className = "event-card";
      card.dataset.kind = eventKind(event);
      if (matchedPlace) card.dataset.placeId = matchedPlace.id;
      card.dataset.eventId = event.id;
      card.innerHTML = `
        <label class="inline-field day-field">
          <span>일차</span>
          <input class="event-day-input budget-edit" data-event-field="day" inputmode="numeric" aria-label="일차" value="${html(event.day)}" />
        </label>
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
          <div class="meta">${eventKindLabel(event)} · ${event.budget ? "예산 포함" : "이동/숙소"}${matchedPlace ? ` · ${html(matchedPlace.category)}` : ""}</div>
          ${matchedPlace ? `
            <button class="matched-place" type="button" data-place-id="${html(matchedPlace.id)}">
              ${html(matchedPlace.name)}${note.menu ? ` · ${html(note.menu)}` : matchedPlace.menu ? ` · ${html(matchedPlace.menu)}` : ""}
            </button>
          ` : ""}
        </div>
        <label class="inline-field money-field">
          <span>예산</span>
          <input class="budget-edit" data-event-field="budget" inputmode="numeric" aria-label="예산" value="${html(event.budget || "")}" />
        </label>
        <button class="delete-inline delete-event" type="button" aria-label="일정 삭제">×</button>
      `;
      group.append(card);
    });

    timeline.append(group);
  }

  if (!visible.length) {
    timeline.innerHTML = `<p class="meta">검색 결과가 없습니다.</p>`;
  }
  visibleCount.value = `${visible.length}개 항목`;
}

function groupByDay(items) {
  const grouped = new Map();
  items.forEach((item) => {
    if (!grouped.has(item.day)) grouped.set(item.day, []);
    grouped.get(item.day).push(item);
  });
  return grouped;
}

function eventKindLabel(event) {
  const kind = eventKind(event);
  if (kind === "night") return "밤 일정";
  if (kind === "food") return "식사";
  return "일정";
}

function renderMemo() {
  if (memoField.innerHTML !== memoHtml) memoField.innerHTML = memoHtml;
}

function saveMemo() {
  try {
    localStorage.setItem(memoHtmlStorageKey, memoHtml);
  } catch (error) {
    alert("메모를 저장할 공간이 부족합니다. 이미지를 줄이거나 삭제한 뒤 다시 시도해 주세요.");
  }
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

// 붙여넣기 위치(커서)에 이미지를 끼워 넣는다.
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

function renderCategories() {
  const categories = ["전체", ...new Set(placeDirectory.map((place) => place.category))];
  categoryStrip.innerHTML = categories.map((category) => `
    <button class="category-button ${category === state.category ? "is-active" : ""}" type="button" data-category="${category}">
      ${html(category)}
    </button>
  `).join("");
}

function savedMapUrl(place) {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
}

function placeId(place) {
  return place.name.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "");
}

function loadPlaceNotes() {
  return loadStoredObject(noteStorageKey);
}

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

function savePlaceNotes() {
  localStorage.setItem(noteStorageKey, JSON.stringify(placeNotes));
}

function savePlaceEdits() {
  localStorage.setItem(placeEditStorageKey, JSON.stringify(placeEdits));
}

function saveDeletedPlaces() {
  localStorage.setItem(deletedPlaceStorageKey, JSON.stringify([...deletedPlaces]));
}

function getPlaceNote(place) {
  return placeNotes[place.id] || {};
}

function buildPlaceDirectory() {
  return [...basePlaceDirectory, ...customPlaces]
    .map((place) => {
      const id = place.id || placeId(place);
      const originalTerms = placeTerms(place);
      return { ...place, id, originalTerms, ...(placeEdits[id] || {}) };
    })
    .filter((place) => !deletedPlaces.has(place.id));
}

function placeMatchesQuery(place, query) {
  if (!query) return true;
  const haystack = [place.name, place.category, place.menu, ...(place.aliases || []), ...(place.originalTerms || [])].join(" ").toLowerCase();
  return haystack.includes(query);
}

function renderSavedPlaces() {
  const query = state.query;
  const filtered = placeDirectory.filter((place) => {
    const categoryMatch = state.category === "전체" || place.category === state.category;
    const queryMatch = placeMatchesQuery(place, query);
    return categoryMatch && queryMatch;
  });

  savedGrid.innerHTML = filtered.map((place) => {
    const note = getPlaceNote(place);
    const scheduled = scheduleForPlace(place);
    return `
    <article class="saved-card" data-place-id="${html(place.id)}">
      <div class="saved-card__top">
        <input class="place-title-input" data-edit-field="name" aria-label="장소명" value="${html(place.name)}" />
        <span class="pill">${html(place.category)}</span>
      </div>
      <small>${html(place.aliases?.length ? place.aliases.join(" · ") : "오프라인 저장 장소")}${place.lat ? ` · ${place.lat.toFixed(5)}, ${place.lng.toFixed(5)}` : ""}</small>
      ${scheduled.length ? `
        <div class="schedule-chip">
          일정 ${scheduled.length}회 · ${html([...new Set(scheduled.map((event) => `${event.day}일차`))].join(", "))}
        </div>
      ` : ""}
      <div class="place-fields">
        <label class="place-field">
          카테고리
          <input data-edit-field="category" placeholder="예: 식당, 마사지, 쇼핑" value="${html(place.category)}" />
        </label>
        <label class="place-field">
          인당 예정 금액
          <input data-field="price" inputmode="numeric" placeholder="${html(place.price ? money(place.price) : "예: ₱500")}" value="${html(note.price)}" />
        </label>
        <label class="place-field">
          추천 메뉴
          <input data-field="menu" placeholder="${html(place.menu || "예: 순대국, 해물찜")}" value="${html(note.menu)}" />
        </label>
        <label class="place-field">
          메모
          <textarea data-field="memo" rows="2" placeholder="영업시간, 주문 팁, 동선 메모">${html(note.memo)}</textarea>
        </label>
      </div>
      <div class="saved-card__actions">
        ${place.lat ? `<a href="${savedMapUrl(place)}" target="_blank" rel="noreferrer">지도에서 열기</a>` : "<span></span>"}
        <button class="delete-place" type="button">삭제</button>
      </div>
    </article>
  `;
  }).join("");

  if (!filtered.length) {
    savedGrid.innerHTML = `<p class="meta">검색 결과가 없습니다.</p>`;
  }
}

function saveGolf() {
  localStorage.setItem(golfStorageKey, JSON.stringify(golf));
}

function golfCourse(id) {
  return golfCourses.find((course) => course.id === id) || golfCourses[0];
}

// 인원수(2/3/4)에 따른 1인당 카트 비용 — 엑셀의 카트 분기 로직과 동일하다.
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
  const total = greenFee + caddy + cart + extra;
  return { course, greenFee, caddy, cart, extra, total };
}

function golfKrw(value) {
  const rate = Number(golf.rate) > 0 ? Number(golf.rate) : exchange.phpToKrw;
  return `₩${Math.round(value * rate).toLocaleString("ko-KR")}`;
}

function renderGolf() {
  if (!golfRounds) return;
  const people = golf.people;
  golfPeople.value = String(people);
  // 입력 중에는 사용자가 친 값을 덮어쓰지 않는다(예: "26." 중간 입력).
  if (document.activeElement !== golfRate) golfRate.value = String(golf.rate);

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
          <small>${golfKrw(total)}</small>
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
      <small>${golfKrw(perPerson)}</small>
    </div>
    <div class="golf-stat">
      <span>1라운드 평균 (1인)</span>
      <strong>${phpText(average)}</strong>
      <small>${golfKrw(average)}</small>
    </div>
    <div class="golf-stat is-grand">
      <span>전체 합계 (${people}명 × ${roundCount}R)</span>
      <strong>${phpText(grand)}</strong>
      <small>${golfKrw(grand)}</small>
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

function renderView() {
  document.querySelectorAll(".guide-view").forEach((element) => element.classList.toggle("is-hidden", state.view !== "guide"));
  document.querySelector(".saved-view").classList.toggle("is-hidden", state.view !== "saved");
  document.querySelector(".golf-view").classList.toggle("is-hidden", state.view !== "golf");
  document.querySelector(".notes-view").classList.toggle("is-hidden", state.view !== "notes");
  document.body.classList.toggle("saved-mode", state.view === "saved");
  document.querySelectorAll(".top-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
}

function renderAll() {
  renderTimeline();
  renderMemo();
  renderCategories();
  renderSavedPlaces();
  renderGolf();
  renderSummary();
  renderView();
}

const backupKeys = [
  eventStorageKey,
  prepNotesStorageKey,
  prepStorageKey,
  remarksStorageKey,
  prepImagesStorageKey,
  remarksImagesStorageKey,
  memoStorageKey,
  memoImagesStorageKey,
  memoHtmlStorageKey,
  customPlaceStorageKey,
  noteStorageKey,
  placeEditStorageKey,
  deletedPlaceStorageKey,
  golfStorageKey,
];

function exportData() {
  const data = { version: 1, exportedAt: new Date().toISOString() };
  backupKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value != null) data[key] = value;
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `clark-guide-backup-${stamp}.json`;
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
  if (!confirm("모든 편집 내용을 지우고 기본 일정으로 되돌릴까요? 되돌릴 수 없습니다.")) return;
  backupKeys.forEach((key) => localStorage.removeItem(key));
  location.reload();
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    state.day = button.dataset.day;
    renderTimeline();
  });
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
  if (field === "budget" || field === "day") renderSummary();
});

timeline.addEventListener("change", (event) => {
  if (!event.target.dataset.eventField) return;
  renderTimeline();
  renderSavedPlaces();
});

timeline.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-event");
  if (deleteButton) {
    const card = deleteButton.closest(".event-card");
    const item = events.find((entry) => entry.id === card.dataset.eventId);
    if (!item || !confirm(`${item.name || "이 일정"} 항목을 삭제할까요?`)) return;
    events = events.filter((entry) => entry.id !== item.id);
    saveEvents();
    renderTimeline();
    renderSavedPlaces();
    renderSummary();
    return;
  }

  const button = event.target.closest(".matched-place");
  if (!button) return;
  const place = placeDirectory.find((item) => item.id === button.dataset.placeId);
  if (!place) return;
  state.view = "saved";
  state.category = "전체";
  history.replaceState(null, "", "#saved");
  renderAll();
  requestAnimationFrame(() => {
    document.querySelector(`[data-place-id="${CSS.escape(place.id)}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
});

// 메모: 텍스트/이미지를 자유롭게 편집하고, 클립보드 이미지는 붙여넣으면 커서 위치에 삽입된다.
memoField.addEventListener("input", () => {
  memoHtml = memoField.innerHTML;
  saveMemo();
});

memoField.addEventListener("paste", (event) => {
  const items = [...(event.clipboardData?.items || [])];
  const imageItem = items.find((item) => item.type.startsWith("image/"));
  if (!imageItem) return; // 일반 텍스트는 기본 붙여넣기 사용
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

categoryStrip.addEventListener("click", (event) => {
  const button = event.target.closest(".category-button");
  if (!button) return;
  state.category = button.dataset.category;
  renderCategories();
  renderSavedPlaces();
});

addEventButton.addEventListener("click", () => {
  const day = state.day === "all" ? 1 : Number(state.day);
  const id = nextId("event", events);
  events.push({ id, day, name: "새 일정", budget: 0, start: "", end: "", isNew: true });
  saveEvents();
  renderTimeline();
  renderSummary();
  requestAnimationFrame(() => {
    const card = document.querySelector(`[data-event-id="${CSS.escape(id)}"]`);
    card?.scrollIntoView({ block: "center", behavior: "smooth" });
    card?.querySelector("[data-event-field='start']")?.focus();
  });
});

addPlaceButton.addEventListener("click", () => {
  const place = { id: nextId("place", customPlaces), name: "새 장소", category: "기타", price: 0, menu: "", lat: "", lng: "" };
  customPlaces.unshift(place);
  saveCustomPlaces();
  placeDirectory = buildPlaceDirectory();
  state.category = "전체";
  renderCategories();
  renderSavedPlaces();
  requestAnimationFrame(() => {
    document.querySelector(`[data-place-id="${CSS.escape(place.id)}"]`)?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
});

savedGrid.addEventListener("input", (event) => {
  const field = event.target.dataset.field;
  const editField = event.target.dataset.editField;
  const card = event.target.closest(".saved-card");
  if ((!field && !editField) || !card) return;
  const id = card.dataset.placeId;
  if (field) {
    placeNotes[id] = { ...(placeNotes[id] || {}), [field]: event.target.value };
    savePlaceNotes();
  }
  if (editField) {
    placeEdits[id] = { ...(placeEdits[id] || {}), [editField]: event.target.value };
    savePlaceEdits();
    placeDirectory = buildPlaceDirectory();
    if (editField === "category") renderCategories();
  }
});

savedGrid.addEventListener("change", (event) => {
  if (!event.target.dataset.editField) return;
  placeDirectory = buildPlaceDirectory();
  renderCategories();
  renderSavedPlaces();
});

savedGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-place");
  if (!button) return;
  const card = button.closest(".saved-card");
  const id = card.dataset.placeId;
  const title = card.querySelector("[data-edit-field='name']").value || "이 장소";
  if (!confirm(`${title} 항목을 삭제할까요?`)) return;
  deletedPlaces.add(id);
  customPlaces = customPlaces.filter((place) => place.id !== id);
  delete placeNotes[id];
  delete placeEdits[id];
  saveDeletedPlaces();
  saveCustomPlaces();
  savePlaceNotes();
  savePlaceEdits();
  placeDirectory = buildPlaceDirectory();
  renderCategories();
  renderSavedPlaces();
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

golfPeople.addEventListener("change", () => {
  golf.people = Number(golfPeople.value) || 4;
  saveGolf();
  renderGolf();
});

golfRate.addEventListener("input", () => {
  const value = Number(golfRate.value);
  golf.rate = value > 0 ? value : 0;
  saveGolf();
  // 입력 중에는 커서 유지를 위해 합계 텍스트만 갱신한다.
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

// PDF(인쇄) 시: 모든 탭 내용을 펼쳐 보이고, 메모/텍스트 칸이 잘리지 않도록 높이를 늘린다.
let printTextareaHeights = null;
window.addEventListener("beforeprint", () => {
  document.querySelectorAll(".guide-view, .saved-view, .golf-view, .notes-view").forEach((element) => element.classList.remove("is-hidden"));
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
