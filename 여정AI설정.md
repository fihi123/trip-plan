# 여정서 AI 인식 설정 (Gemini + Firebase Function)

여정서(전자항공권) 양식은 항공사·여행사마다 제각각이라, 정규식 파서만으로는 새 양식이 나올 때마다 인식이 깨집니다. 그래서 **PDF에서 뽑은 텍스트를 Gemini에 보내 구조화**하는 방식을 씁니다.

정적 사이트(GitHub Pages)에는 API 키를 넣을 수 없으므로(소스에 그대로 노출됨), **키는 Firebase Function의 시크릿으로만** 두고 클라이언트는 텍스트만 함수로 보냅니다. 함수가 Gemini를 호출해 JSON을 돌려줍니다.

> AI 엔드포인트를 설정하지 않아도 앱은 정상 동작합니다. 이 경우 기존 정규식 파서만 쓰며(오프라인 폴백), 인식 못 하는 양식은 기간을 직접 입력하면 됩니다.

## 준비물 요약

1. Firebase 프로젝트를 **Blaze(종량제)** 요금제로 업그레이드 (Function 배포에 필요)
2. **Gemini API 키** 발급 (Google AI Studio)
3. 키를 Function **시크릿**으로 등록
4. Function **배포**
5. 배포된 **함수 URL**을 `app.js`의 `AI_PARSE_ENDPOINT`에 입력

---

## 1. Blaze 요금제로 업그레이드

- https://console.firebase.google.com → 프로젝트 `trip-plan-4b079` → 좌측 하단 **요금제 업그레이드 → Blaze**.
- Cloud Functions는 무료 할당량이 넉넉해 개인용 파싱 수준이면 사실상 비용이 거의 없습니다. 그래도 안심하려면 결제 예산 알림을 걸어 두세요.

## 2. Gemini API 키 발급

- https://aistudio.google.com/apikey 접속 → **Create API key**.
- 키 문자열을 복사해 둡니다. (이 키는 절대 앱 코드나 깃에 넣지 마세요.)

## 3. Firebase CLI 준비

```bash
npm install -g firebase-tools     # 처음 한 번
firebase login                    # 처음 한 번
cd /home/baek/trip/functions
npm install                       # firebase-functions 설치
```

## 4. 키를 시크릿으로 등록

```bash
cd /home/baek/trip
firebase functions:secrets:set GEMINI_API_KEY
# 프롬프트가 뜨면 2단계에서 복사한 Gemini 키를 붙여넣고 엔터
```

## 5. Function 배포

```bash
firebase deploy --only functions
```

배포가 끝나면 함수 URL이 출력됩니다. 예:

```
Function URL (parseItinerary(asia-northeast3)): https://asia-northeast3-trip-plan-4b079.cloudfunctions.net/parseItinerary
```

## 6. 앱에 URL 연결

`app.js`에서 아래 줄을 찾아 5단계의 URL을 넣습니다.

```js
const AI_PARSE_ENDPOINT = "https://asia-northeast3-trip-plan-4b079.cloudfunctions.net/parseItinerary";
```

저장 후 커밋·푸시하면 GitHub Pages에 반영됩니다. 이제 **여정 PDF 불러오기**를 누르면 확인창 제목에 `(AI 인식)`이 뜨고, 어떤 양식이든 편명·날짜·시각·구간·항공료를 뽑아 일정과 지출에 넣어 줍니다.

---

## 동작 방식 / 보안 메모

- 클라이언트는 PDF 텍스트만 보냅니다. **Gemini 키는 함수 시크릿에만** 있고 브라우저로 내려가지 않습니다.
- 함수는 **Origin 화이트리스트**(github.io / web.app / localhost)로 다른 사이트의 브라우저 남용을 차단하고, 입력 길이 상한(20,000자)과 `maxInstances=3`으로 비용 폭주를 막습니다.
- URL을 직접 아는 비(非)브라우저 호출까지 막고 싶으면 **Firebase App Check**(reCAPTCHA)를 추가로 붙이면 됩니다.
- 새 기기 도메인에서 쓰려면 `functions/index.js`의 `ALLOWED_ORIGINS`에 오리진을 추가하고 재배포하세요.

## 문제 해결

- **AI 인식이 안 되고 "기본 인식"으로 뜸**: `AI_PARSE_ENDPOINT`가 비었거나 URL 오타, 또는 함수 호출 실패(폴백). 브라우저 콘솔 로그 확인.
- **403 오리진 오류**: 현재 접속 도메인이 `ALLOWED_ORIGINS`에 없음. 추가 후 재배포.
- **502 AI 인식 실패**: 시크릿 키 미등록/무효 또는 Gemini 할당량 초과. `firebase functions:log` 로 확인.
