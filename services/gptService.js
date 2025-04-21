// 도시추천
require('dotenv').config();
const axios = require('axios');
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
const db = admin.firestore();

const GPT_API_KEY = process.env.GPT_API_KEY;

exports.getRecommendedCities = async (userKeywords) => {
  try {
    const snapshot = await db.collection('cities').get();
    const cities = snapshot.docs.map(doc => ({
      id: doc.id,
      name_ko: doc.data().name_ko,
      keywords: doc.data().keywords || [],
      country: doc.data().country
    }));

    const cityListString = cities.map(city => {
      return `ID: ${city.id}, 이름: ${city.name_ko}, 키워드: [${city.keywords.join(', ')}]`;
    }).join('\n');

    const prompt = `
다음은 여행 도시 후보 리스트야:

${cityListString}

사용자가 입력한 키워드는: [${userKeywords.join(', ')}] 이고,
이 키워드에 가장 잘 어울리는 도시 5개를 골라줘.
도시는 위의 ID 기준으로 JSON 배열 형식으로 응답해줘.
예: ["tokyo", "lhasa", "bali", "chiang_mai", "kathmandu"]
`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '당신은 여행지 추천 전문가입니다.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    console.log("GPT 응답:", content);

    let recommendedIds;
    try {
      recommendedIds = JSON.parse(content);
    } catch (e) {
      recommendedIds = content
        .split('\n')
        .map(line => line.replace(/["\[\],]/g, '').trim())
        .filter(Boolean);
    }

    const recommended = cities.filter(city => recommendedIds.includes(city.id));
    return recommended;
  } catch (error) {
    console.error("도시 추천 오류:", error.message);
    throw new Error("도시 추천 실패");
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
