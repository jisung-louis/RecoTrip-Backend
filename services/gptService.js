// 도시추천
require('dotenv').config();
const axios = require('axios');

const GPT_API_KEY = process.env.GPT_API_KEY;

exports.getRecommendedCities = async (promptText) => {
  const prompt = `
  여행을 가고 싶어하는 사용자가 이렇게 말했어: "${promptText}"
  이 사람에게 추천할만한 전 세계 도시 3곳을 알려줘.
  결과는 JSON 배열 형식으로 응답해줘. 예: ["프랑스 파리", "일본 도쿄", "그리스 로마"]
  `;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '당신은 여행 추천 도우미입니다.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    console.log("GPT 응답:", content);

    try {
      return JSON.parse(content);
    } catch (e) {
      return content
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
    }
  } catch (error) {
    console.error("GPT API 호출 에러:", error.response?.data || error.message);
    throw new Error("GPT 호출 실패");
  }
};


require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// 사진 URL 생성
const getPhotoUrl = (photoReference, maxwidth = 400) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
};

// 도시명 → 위도/경도 변환
const getCoordinates = async (cityName) => {
  const geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  const response = await axios.get(geoUrl, {
    params: {
      address: cityName,
      key: GOOGLE_API_KEY,
      language: 'ko',
    },
  });

  const location = response.data.results[0]?.geometry?.location;
  if (!location) throw new Error('위치 정보를 찾을 수 없습니다.');
  return location; // { lat, lng }
};

// 관광지 검색
exports.searchPlaces = async (cityName) => {
  const location = await getCoordinates(cityName);
  const nearUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

  const response = await axios.get(nearUrl, {
    params: {
      location: `${location.lat},${location.lng}`,
      radius: 30000, // 10km 반경
      type: 'tourist_attraction',
      key: GOOGLE_API_KEY,
      language: 'ko',
    },
  });

  return response.data.results.map(place => ({
    name: place.name,
    address: place.vicinity,
    rating: place.rating,
    location: place.geometry.location,
    place_id: place.place_id,
    photo: place.photos?.[0]
      ? getPhotoUrl(place.photos[0].photo_reference)
      : null,
  }));
};


const { searchPlaces } = require('../services/googlePlaces');

exports.getPlaces = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }

  try {
    const places = await searchPlaces(query);
    res.json({ results: places.slice(0, 5) });
  } catch (err) {
    console.error('Places API Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
};
