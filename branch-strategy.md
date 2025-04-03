# 🧩 RecoTrip 백엔드 브랜치 전략

RecoTrip 백엔드는 기능 단위로 브랜치를 나누어 두 명이 협업할 수 있도록 설계되어 있습니다.

---

## ✅ 브랜치 구조

| 브랜치 이름 | 설명 |
|-------------|------|
| `main`      | 배포용 브랜치 – 항상 안정된 코드만 유지 |
| `dev`       | 개발 통합 브랜치 – 모든 기능 브랜치가 머지되는 브랜치 |
| `feat/*`    | 기능 개발 브랜치 – 기능 단위로 분리 |

---

## 👥 개발자 파트 분배 (Team F4)

| 이름     | 담당 브랜치 (feat/...)                  | 역할 |
|----------|------------------------------------------|------|
| **김민수** | `feat/gpt-recommend`, `feat/weather-api`, `feat/firestore-integration` | GPT, 날씨, DB |
| **전지성** | `feat/place-api`, `feat/hotel-api`, `feat/auth` | 관광지, 호텔, 인증 |

---

## ✨ 브랜치 예시 목록

```
main
dev
feat/gpt-recommend
feat/schedule-recommend
feat/place-api
feat/hotel-api
feat/weather-api
feat/auth
feat/firestore-integration
```

---

## ⚙️ 작업 흐름

1. dev 브랜치에서 기능 브랜치를 새로 생성
2. 기능 구현 후 Pull Request로 dev에 병합 요청
3. 서로 코드 리뷰 후 머지
4. dev 안정화 후 main 브랜치에 병합 (배포 시점)

---

## 🧠 브랜치 생성 예시

```bash
# dev에서 분기
git checkout dev

# GPT 도시 추천 기능 브랜치 생성
git checkout -b feat/gpt-recommend
git push -u origin feat/gpt-recommend
```