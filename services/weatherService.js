require('dotenv').config();
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// 1. 도시 이름 → 위도/경도 변환
const getCoordinates = async (cityName) => {
  const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: cityName,
      key: GOOGLE_API_KEY,
    },
  });

  const location = res.data.results[0]?.geometry?.location;
  if (!location) throw new Error('도시 위치를 찾을 수 없습니다.');
  return location; // { lat, lng }
};

// 2. 날씨 정보 조회
exports.getWeatherByCityAndDate = async (city, dateStr) => {
  const targetDate = new Date(dateStr);
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 5); // 5일까지만 예측 가능

  if (targetDate > maxDate) {
    throw new Error('최대 5일 후까지만 날씨 조회가 가능합니다.');
  }

  const { lat, lng } = await getCoordinates(city);

  const res = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      lat,
      lon: lng,
      appid: OPENWEATHER_API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  });

  const matched = res.data.list.find(item => {
    const dt = new Date(item.dt * 1000);
    return dt.toDateString() === targetDate.toDateString();
  });

  if (!matched) {
    throw new Error('날짜에 해당하는 날씨 예보가 없습니다.');
  }

  return {
    description: matched.weather[0].description,
    temp: matched.main.temp,
  };
};