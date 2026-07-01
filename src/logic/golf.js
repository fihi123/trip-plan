import { GOLF_COURSES, GOLF_NUMBER_FIELDS, DEFAULT_GOLF } from '../constants/golf.js';
import { loadStoredObject } from '../services/storage.js';

export function loadGolf(key, seeded) {
  const stored = loadStoredObject(key);
  const people = [2, 3, 4].includes(Number(stored.people)) ? Number(stored.people) : DEFAULT_GOLF.people;
  const hasStoredRounds = Array.isArray(stored.rounds) && stored.rounds.length;
  const rounds = hasStoredRounds
    ? stored.rounds.map((round, index) => ({
        id: round.id || `round-${index + 1}`,
        course: GOLF_COURSES.some((course) => course.id === round.course) ? round.course : GOLF_COURSES[0].id,
        day: round.day === "주중" ? "주중" : "주말",
        tripDay: Number(round.tripDay) >= 1 ? Math.round(Number(round.tripDay)) : 1,
        time: typeof round.time === "string" ? round.time : "",
      }))
    : (seeded ? [] : DEFAULT_GOLF.rounds.map((round) => ({ ...round })));

  const courseEdits = {};
  const storedEdits = stored.courseEdits && typeof stored.courseEdits === "object" ? stored.courseEdits : {};
  GOLF_COURSES.forEach((course) => {
    const edit = storedEdits[course.id];
    if (!edit || typeof edit !== "object") return;
    const clean = {};
    if (typeof edit.name === "string") clean.name = edit.name;
    GOLF_NUMBER_FIELDS.forEach((field) => {
      if (edit[field] != null && Number.isFinite(Number(edit[field]))) clean[field] = Number(edit[field]);
    });
    if (Object.keys(clean).length) courseEdits[course.id] = clean;
  });
  return { people, rounds, courseEdits };
}

export function getEffectiveCourse(courseId, courseEdits) {
  const base = GOLF_COURSES.find((c) => c.id === courseId) || GOLF_COURSES[0];
  const edit = courseEdits[courseId] || {};
  return { ...base, ...edit };
}

export function calculateRoundPrice(round, golfPeople, courseEdits) {
  const course = getEffectiveCourse(round.course, courseEdits);
  const greenfee = round.day === "주말" ? course.weekend : course.weekday;
  const cartField = `cart${golfPeople}`;
  const cart = course[cartField] || 0;
  const perPerson = greenfee + course.caddy + cart + course.extra;
  return { perPerson, greenfee, caddy: course.caddy, cart, extra: course.extra };
}
