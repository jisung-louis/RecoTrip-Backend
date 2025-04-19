require('dotenv').config(); // 환경 변수 불러오기
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 허용 및 JSON 파싱 설정
app.use(cors());
app.use(express.json());

// 라우터 등록
app.use('/api/recommend', require('./routes/recommendRoutes'));
app.use('/api/places', require('./routes/placesRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/hotels', require('./routes/hotelRoutes'));
// 이후 여기에 다른 API도 추가하면 됨:

//에러 핸들러
app.use(errorHandler)

// Swagger 설정
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'RecoTrip API',
      version: '1.0.0',
      description: 'RecoTrip 프로젝트의 백엔드 API 문서입니다.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '로컬 서버',
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger 주석을 읽을 경로
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Backend 실행
app.listen(PORT, () => {
  console.log(`RecoTrip backend running at http://localhost:${PORT}`);
});