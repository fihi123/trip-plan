import { STORAGE_KEYS, BASE_EVENTS, DEFAULT_GOLF, FIREBASE_CONFIG } from './constants/defaults.js';
import { loadStoredArray, saveToStorage } from './services/storage.js';
import { loadTrip, loadLodging } from './logic/trip.js';
import { loadGolf } from './logic/golf.js';
import { loadRates } from './services/currency.js';
import { renderAll, renderView, renderDaySegments } from './ui/render.js';

// 전역 상태
const state = {
  day: "1",
  view: location.hash.replace('#', '') || 'guide',
};

// 데이터 로드
let events = loadStoredArray(STORAGE_KEYS.EVENTS);
const seeded = localStorage.getItem(STORAGE_KEYS.SEEDED) === "done";
if (!events.length && !seeded) {
  events = BASE_EVENTS.map((event, index) => ({ ...event, id: `event-${index + 1}` }));
}

let trip = loadTrip(STORAGE_KEYS.TRIP);
let golf = loadGolf(STORAGE_KEYS.GOLF, seeded);
let rates = loadRates(STORAGE_KEYS.RATES);
let memoHtml = localStorage.getItem(STORAGE_KEYS.MEMO_HTML) || "";

// 초기화
function init() {
  if (!seeded) {
    saveToStorage(STORAGE_KEYS.EVENTS, events);
    saveToStorage(STORAGE_KEYS.GOLF, golf);
    saveToStorage(STORAGE_KEYS.SEEDED, "done");
  }
  
  // 렌더링 호출 (현재는 생략, app.js의 로직이 main.js로 다 옮겨와야 함)
  // renderAll(state, { events, trip, golf, rates, memoHtml });
}

// 이벤트 리스너 바인딩 로직...
// (기존 app.js의 수많은 addEventListener들을 이리로 가져옴)

document.addEventListener('DOMContentLoaded', init);
