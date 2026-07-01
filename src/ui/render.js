import { html, phpText, krwText, usdText, originalMoneyText } from '../utils/format.js';
import { isoToMD, isoDowKr, isoAddDays } from '../utils/date.js';
import { EVENT_CATEGORIES } from '../constants/defaults.js';
import { calculateRoundPrice } from '../logic/golf.js';

export function renderView(state) {
  document.querySelectorAll(".guide-view").forEach((el) => el.classList.toggle("is-hidden", state.view !== "guide"));
  document.querySelector(".spend-view").classList.toggle("is-hidden", state.view !== "spend");
  document.querySelector(".golf-view").classList.toggle("is-hidden", state.view !== "golf");
  document.querySelector(".notes-view").classList.toggle("is-hidden", state.view !== "notes");
  document.querySelectorAll(".top-tab").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.view === state.view));
}

export function renderDaySegments(state, trip) {
  const container = document.querySelector("#daySegments");
  let htmlStr = "";
  for (let i = 1; i <= trip.days; i++) {
    const dayStr = String(i);
    const active = state.day === dayStr ? "is-active" : "";
    const dateLabel = trip.startDate ? `<span class="segment__date">${isoToMD(isoAddDays(trip.startDate, i - 1))} (${isoDowKr(isoAddDays(trip.startDate, i - 1))})</span>` : "";
    htmlStr += `<button class="segment ${active}" data-day="${dayStr}">${dayStr}일차${dateLabel}</button>`;
  }
  container.innerHTML = htmlStr;
}

export function renderTimeline(state, events, golf, rates) {
  const container = document.querySelector("#timeline");
  const dayEvents = events.filter(e => String(e.day) === state.day);
  // ... (기존 app.js의 타임라인 렌더링 로직)
  container.innerHTML = dayEvents.map(e => `<div class="timeline__item">${html(e.name)}</div>`).join("");
}

export function renderAll(state, data) {
  renderDaySegments(state, data.trip);
  renderTimeline(state, data.events, data.golf, data.rates);
  renderView(state);
  // ... 기타 렌더링 함수들 호출
}
