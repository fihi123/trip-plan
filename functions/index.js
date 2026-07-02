// 여정서(전자항공권) AI 인식 프록시.
//
// 정적 사이트(GitHub Pages)에는 Gemini API 키를 넣을 수 없다(소스에 노출됨).
// 그래서 키는 이 함수의 "시크릿"으로만 두고, 클라이언트는 추출한 여정서 텍스트만
// 이 함수로 보낸다. 함수가 Gemini를 호출해 구조화된 JSON을 돌려준다.
//
// 배포 전 준비 (자세한 건 여정AI설정.md):
//   1) Firebase 프로젝트를 Blaze(종량제) 요금제로 업그레이드
//   2) Google AI Studio에서 Gemini API 키 발급
//   3) firebase functions:secrets:set GEMINI_API_KEY   (발급한 키 붙여넣기)
//   4) firebase deploy --only functions
//   5) 배포 후 출력되는 함수 URL을 app.js의 AI_PARSE_ENDPOINT에 넣기

const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

// 이 오리진에서 온 브라우저 요청만 허용한다(서버측 검사이므로 다른 사이트의
// 브라우저 남용을 실제로 차단한다). URL을 직접 아는 비(非)브라우저 호출까지
// 막으려면 App Check를 추가로 붙이면 된다.
const ALLOWED_ORIGINS = new Set([
  "https://fihi123.github.io",
  "https://trip-plan-4b079.web.app",
  "https://trip-plan-4b079.firebaseapp.com",
  "http://localhost:5000",
  "http://localhost:8080",
  "http://127.0.0.1:5500",
]);

const MODEL = "gemini-2.5-flash";
const MAX_TEXT = 20000; // 여정서 텍스트 상한(남용/비용 방지)

// Gemini가 이 스키마대로 JSON을 내도록 강제한다. 필드 모양은 app.js의
// parseItinerary() 결과와 맞춰 두어 클라이언트 후처리를 최소화한다.
const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    startDate: { type: "string", description: "출국일 YYYY-MM-DD" },
    endDate: { type: "string", description: "귀국(마지막 도착)일 YYYY-MM-DD" },
    airfareKrw: { type: "number", description: "총 항공료(원화 숫자만). 없으면 0" },
    flights: {
      type: "array",
      items: {
        type: "object",
        properties: {
          flightNo: { type: "string", description: "편명 예: 5J185, KE185" },
          dateIso: { type: "string", description: "출발일 YYYY-MM-DD" },
          dep: { type: "string", description: "출발 현지시각 24시간 HH:MM" },
          arr: { type: "string", description: "도착 현지시각 24시간 HH:MM" },
          off: { type: "string", description: "익일(다음날) 도착이면 '+1', 아니면 빈 문자열" },
          route: { type: "string", description: "출발→도착 IATA 공항코드 예: ICN→MNL" },
          airline: { type: "string", description: "항공사명" },
        },
        required: ["flightNo", "dateIso", "dep", "arr", "route"],
      },
    },
  },
  required: ["startDate", "endDate", "flights"],
};

function buildPrompt(text) {
  return [
    "다음은 항공 여정서/전자항공권 PDF에서 추출한 텍스트다.",
    "항공편 정보를 정확히 추출해 스키마에 맞는 JSON으로만 답하라.",
    "규칙:",
    "- 모든 시각은 24시간제 HH:MM.",
    "- 날짜는 결제일/발권 연도와 요일을 근거로 실제 여행 연도를 붙여 YYYY-MM-DD.",
    "- 도착이 출발 다음날이면 해당 편 off를 '+1'로, 아니면 빈 문자열.",
    "- route는 IATA 공항코드로 'ICN→MNL' 형식(도시명 말고 코드).",
    "- 왕복/경유면 flights에 각 구간을 시간 순서대로 모두 넣어라.",
    "- 총 항공료가 KRW로 있으면 airfareKrw에 콤마 뺀 숫자만, 없으면 0.",
    "- 확실하지 않은 값은 지어내지 말고 빈 문자열/0으로 둬라.",
    "",
    "텍스트:",
    '"""',
    text,
    '"""',
  ].join("\n");
}

async function callGemini(text, key) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`;
  const body = {
    contents: [{ parts: [{ text: buildPrompt(text) }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: RESPONSE_SCHEMA,
      temperature: 0,
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini ${res.status}: ${detail.slice(0, 500)}`);
  }
  const data = await res.json();
  const jsonText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!jsonText) throw new Error("Gemini 응답에 내용이 없습니다.");
  return JSON.parse(jsonText);
}

exports.parseItinerary = onRequest(
  {
    secrets: [GEMINI_API_KEY],
    region: "asia-northeast3",
    memory: "256MiB",
    timeoutSeconds: 30,
    maxInstances: 3, // 폭주 시 비용 상한
    cors: false, // CORS는 아래에서 오리진 화이트리스트로 직접 처리
  },
  async (req, res) => {
    const origin = req.headers.origin || "";
    const allowed = ALLOWED_ORIGINS.has(origin);
    if (allowed) {
      res.set("Access-Control-Allow-Origin", origin);
      res.set("Vary", "Origin");
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Max-Age", "3600");
    }

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "POST만 허용됩니다." });
      return;
    }
    if (!allowed) {
      res.status(403).json({ error: "허용되지 않은 오리진입니다." });
      return;
    }

    const text = req.body && typeof req.body.text === "string" ? req.body.text : "";
    if (text.length < 10) {
      res.status(400).json({ error: "여정서 텍스트가 없습니다." });
      return;
    }

    try {
      const result = await callGemini(text.slice(0, MAX_TEXT), GEMINI_API_KEY.value());
      res.json(result);
    } catch (err) {
      logger.error("Gemini 호출 실패", err);
      res.status(502).json({ error: "AI 인식에 실패했습니다." });
    }
  }
);
