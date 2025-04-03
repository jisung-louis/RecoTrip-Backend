# 📁 RecoTrip 백엔드 디렉토리 구조 설명

RecoTrip 백엔드는 Node.js + Express 기반으로 구성되어 있으며, 기능별 디렉토리 구분을 통해 협업과 유지보수를 용이하게 설계했습니다.

## 📁 루트 디렉토리 구조
```
recotrip-backend/
├── index.js
├── .env / .env.example
├── package.json
│
├── routes/
├── controllers/
├── services/
├── middlewares/
├── utils/
├── docs/
```

## 📂 디렉토리/파일별 설명

### index.js
- 서버의 진입점(메인 파일)으로, Express 앱을 초기화하고 라우터와 미들웨어를 연결합니다.

### .env / .env.example
- .env는 민감한 설정값(API 키 등)을 저장하고, .env.example은 협업자를 위한 템플릿입니다.

### package.json
- 프로젝트 메타 정보 및 패키지 의존성을 관리하는 파일입니다.

### routes/
- URL 경로를 설정하는 라우터 디렉토리입니다. 어떤 요청이 어떤 컨트롤러로 갈지 정의합니다.

### controllers/
- 실제 요청을 처리하는 함수들을 모아둔 디렉토리입니다. 서비스 호출 및 응답을 담당합니다.

### services/
- GPT, Google Places, OpenWeather 등의 외부 API와의 통신을 담당합니다.

### middlewares/
- 에러 핸들링, 인증 등 전역에서 사용할 미들웨어 함수들을 정의합니다.

### utils/
- 공통적으로 쓰이는 포맷팅, 파싱, 계산 등의 유틸 함수들이 모여 있는 곳입니다.

### docs/
- API 명세서나 브랜치 전략 등 프로젝트 관련 문서를 보관하는 디렉토리입니다.