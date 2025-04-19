require('dotenv').config();
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// 도시 이름 → 위도/경도
const getCoordinates = async (city) => {
  const res = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: city,
      key: GOOGLE_API_KEY,
    },
  });

  const location = res.data.results[0]?.geometry?.location;
  if (!location) throw new Error('도시 위치를 찾을 수 없습니다.');
  return location; // { lat, lng }
};

// 호텔 정보 검색
exports.fetchHotelsByCity = async (city) => {
  const { lat, lng } = await getCoordinates(city);

  const res = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
    params: {
      location: `${lat},${lng}`,
      radius: 10000, // 3km 반경
      type: 'lodging', // 호텔, 숙소
      key: GOOGLE_API_KEY,
      language: 'ko',
    },
  });

  const hotels = res.data.results.map(h => ({
    name: h.name,
    address: h.vicinity,
    rating: h.rating,
    location: h.geometry.location,
    photo: h.photos?.[0]
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${h.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
      : null,
    place_id: h.place_id,
  }));

  return hotels.slice(0, 15); // 상위 10개만 반환
};