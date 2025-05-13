require('dotenv').config();
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// 호텔 정보 검색 (좌표 기반)
exports.fetchHotelsByCity = async (lat, lng, radius = 1500) => {
  const res = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
    params: {
      location: `${lat},${lng}`,
      radius,
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

  return hotels.slice(0, 15); // 상위 15개만 반환
};