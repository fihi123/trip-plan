import { html, phpText, krwText, usdText, originalMoneyText } from '../utils/format.js';
import { isoToMD, isoDowKr, isoAddDays } from '../utils/date.js';
import { EVENT_CATEGORIES } from '../constants/defaults.js';
import { calculateRoundPrice, getEffectiveCourse } from '../logic/golf.js';

export function renderView(state) {
  document.querySelectorAll(".guide-view").forEach((el) => el.classList.toggle("is-hidden", state.view !== "guide"));
  document.querySelector(".spend-view").classList.toggle("is-hidden", state.view !== "spend");
  document.querySelector(".golf-view").classList.toggle("is-hidden", state.view !== "golf");
  document.querySelector(".notes-view").classList.toggle("is-hidden", state.view !== "notes");
  document.querySelectorAll(".top-tab").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.view === state.view));
}

export function renderDaySegments(state, trip) {
  const container = document.querySelector("#daySegments");
  if (!container) return;
  if (Number(state.day) > trip.days) state.day = String(trip.days);
  let buttons = "";
  for (let day = 1; day <= trip.days; day += 1) {
    const dateLabel = trip.startDate ? `<span class="segment__date">${isoToMD(isoAddDays(trip.startDate, day - 1))} (${isoDowKr(isoAddDays(trip.startDate, day - 1))})</span>` : "";
    buttons += `<button class="segment ${String(day) === state.day ? "is-active" : ""}" type="button" data-day="${day}">${day}일차${dateLabel}</button>`;
  }
  container.innerHTML = buttons;
}

export function renderTrip(trip, tripNights, tripDays, tripDates) {
  if (document.activeElement !== tripNights) tripNights.value = String(trip.nights);
  if (document.activeElement !== tripDays) tripDays.value = String(trip.days);
  const lodgingText = ""; // lodging 관련은 별도 렌더링에서 처리
  tripDates.textContent = trip.startDate
    ? `✈️ ${trip.startDate}(${isoDowKr(trip.startDate)}) 출국 ~ ${trip.endDate}(${isoDowKr(trip.endDate)}) 귀국 · ${trip.nights}박 ${trip.days}일`
    : "";
}

function startMinutes(event) {
  if (!event.start) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(event.start).trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function sortDayEvents(items) {
  let anchor = null;
  for (const event of items) {
    const minutes = startMinutes(event);
    if (minutes != null) { anchor = minutes; break; }
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

export function renderTimeline(state, events, golf, rates, trip) {
  const container = document.querySelector("#timeline");
  if (!container) return;
  const items = sortDayEvents(events.filter((event) => String(event.day) === state.day));
  container.innerHTML = "";

  if (trip.startDate) {
    const iso = isoAddDays(trip.startDate, Number(state.day) - 1);
    const head = document.createElement("div");
    head.className = "day-date";
    head.textContent = `${state.day}일차 · ${isoToMD(iso)} (${isoDowKr(iso)})`;
    container.append(head);
  }

  items.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.dataset.eventId = event.id;
    const categoryOptions = EVENT_CATEGORIES.map((name) =>
      `<option value="${name}" ${name === event.category ? "selected" : ""}>${name}</option>`
    ).join("");
    card.innerHTML = `
      <div class="event-main">
        <div class="event-editor">
          <label class="inline-field event-name-input">
            <span>장소 / 내용</span>
            <input data-event-field="name" value="${html(event.name)}" />
          </label>
          <label class="inline-field event-time">
            <span>시작</span>
            <input data-event-field="start" placeholder="10:00" value="${html(event.start || "")}" />
          </label>
          <label class="inline-field event-time">
            <span>종료</span>
            <input data-event-field="end" placeholder="11:00" value="${html(event.end || "")}" />
          </label>
          <label class="inline-field event-cat">
            <span>분류</span>
            <select data-event-field="category">${categoryOptions}</select>
          </label>
        </div>
      </div>
      <label class="inline-field money-field">
        <span>예산(₱)</span>
        <input class="budget-edit" data-event-field="budget" inputmode="numeric" value="${html(event.budget || "")}" />
      </label>
      <button class="delete-inline delete-event" type="button">×</button>
    `;
    container.append(card);
  });

  const golfForDay = golf.rounds.filter((round) => Number(round.tripDay) === Number(state.day));
  golfForDay.forEach((round) => {
    const breakdown = calculateRoundPrice(round, golf.people, golf.courseEdits);
    const course = getEffectiveCourse(round.course, golf.courseEdits);
    const card = document.createElement("article");
    card.className = "event-card golf-event";
    card.innerHTML = `
      <div class="event-main">
        <div class="golf-event__title">⛳ 골프 · ${html(course.name)} <small>${html(round.day)}${round.time ? ` · ${html(round.time)}` : ""}</small></div>
        <div class="meta">골프 · 1인 ${krwText(breakdown.perPerson, rates.phpToKrw)} · ${usdText(breakdown.perPerson, rates.phpPerUsd)}</div>
      </div>
      <div class="money-field golf-event__cost">${phpText(breakdown.perPerson)}</div>
    `;
    container.append(card);
  });
}

export function renderSpend(events, golf, rates, extraSpends, lodging) {
  // ... (app.js의 복잡한 지출 계산 및 테이블 생성 로직 이식)
}

export function renderGolf(golf, rates) {
  // ... (app.js의 골프 라운드 및 요금표 렌더링 로직 이식)
}
