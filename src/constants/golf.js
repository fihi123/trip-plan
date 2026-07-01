// ⛳ 골프 비용 데이터
export const GOLF_COURSES = [
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

export const GOLF_NUMBER_FIELDS = ["weekday", "weekend", "caddy", "cart2", "cart3", "cart4", "extra"];

export const DEFAULT_GOLF = {
  people: 4,
  rounds: [
    { id: "round-1", course: "Luisita", day: "주말", tripDay: 2, time: "06:30" },
    { id: "round-2", course: "Pradera_May", day: "주말", tripDay: 3, time: "06:30" },
    { id: "round-3", course: "Korea", day: "주중", tripDay: 4, time: "12:00" },
  ],
};
