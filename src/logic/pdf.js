import { isoDiffDays } from '../utils/date.js';

export async function extractPdfText(file) {
  if (!window.pdfjsLib) return "";
  const buffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: buffer }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(" ") + "\n";
  }
  return text;
}

export function parseItinerary(text) {
  // ... (app.js의 복잡한 정규식 및 파싱 로직)
  return null; // 요약본
}
