# 📦 RecoTrip Backend

RecoTrip은 GPT를 기반으로 사용자 맞춤 여행지를 추천하고, 관광지 정보, 숙박, 날씨 정보를 종합하여 여행 일정을 자동 생성해주는 Android 애플리케이션입니다.  
이 저장소는 해당 서비스의 Node.js 기반 백엔드 서버입니다.

---

## 🚀 주요 기능

- 🔍 키워드 기반 GPT 여행지 추천 API
- 🗺️ GPT를 활용한 자동 여행 경로 생성 API
- 📍 Google Places API를 활용한 관광지 및 호텔 정보 제공
- ☀️ OpenWeather API를 통한 날씨 정보 제공
- 🔐 Firebase Authentication을 통한 사용자 인증
- 📝 Firestore를 활용한 사용자 데이터 저장

---

## 🛠️ 기술 스택

| 구분       | 사용 기술                      |
|------------|-------------------------------|
| Backend    | Node.js, Express.js           |
| API 호출   | Axios                         |
| 환경 변수  | dotenv                        |
| 인증       | Firebase Authentication       |
| DB         | Firebase Firestore            |
| 외부 API   | OpenAI GPT, Google Places API, OpenWeather API |

---

## 📁 폴더 구조

```
recotrip-backend/
├── index.js
├── .env.example
├── package.json
├── routes/
├── controllers/
├── services/
├── middlewares/
├── utils/
└── docs/
```

---

## ⚙️ 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/TeamF4/recotrip-backend.git
cd recotrip-backend

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env
# .env 파일에 실제 API 키와 설정값 입력

# 4. 서버 실행
npm run dev
```
---

## 🌿 브랜치 전략

RecoTrip 백엔드 레포지토리는 다음과 같은 브랜치 전략을 따릅니다.

| 브랜치 이름 | 설명 |
|-------------|------|
| `main`      | 배포용 브랜치 – 항상 안정된 코드만 유지 |
| `dev`       | 개발 통합 브랜치 – 모든 기능 브랜치가 머지되는 브랜치 |
| `feat/*`    | 기능 개발 브랜치 – ex. `feat/gpt-recommend`, `feat/weather-api` 등 |

### ✅ 커밋 메시지 컨벤션

| 타입        | 설명 |
|-------------|------|
| `feat:`     | 새로운 기능 추가 |
| `fix:`      | 버그 수정 |
| `docs:`     | 문서 변경 |
| `refactor:` | 리팩토링 (기능 변화 없음) |
| `chore:`    | 설정/환경/빌드 관련 작업 등 |

> 모든 기능은 `feat/*` 브랜치에서 개발한 후 `dev`로 Pull Request를 통해 병합합니다.  
> `main` 브랜치는 배포 직전에 `dev`에서 머지됩니다.
---




## 👨‍👩‍👧‍👦 팀원 (Team F4)

- 송진우 – 프론트엔드 / 커뮤니티, 홈, 마이페이지
- 김민수 – 백엔드 / GPT 및 외부 API 연동
- 전지성 – 팀장 / 전체 일정, 로그인 기능 구현
- 임다빈 – 디자인 및 UI/UX, 설정 화면 개발

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
