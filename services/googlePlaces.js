require('dotenv').config();
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

exports.searchPlaces = async (query) => {
  const url = `https://places.googleapis.com/v1/places:searchText?key=${GOOGLE_API_KEY}`;

  const response = await axios.post(
    url,
    {
      textQuery: `${query} 관광지`,
      languageCode: 'ko'
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  // 응답 구조에 맞게 데이터 파싱
  return (response.data.places || []).map(place => ({
    name: place.displayName?.text || '',
    address: place.formattedAddress || '',
    rating: place.rating || null,
    location: place.location
      ? { lat: place.location.latitude, lng: place.location.longitude }
      : null,
    place_id: place.id,
    photo: place.photos?.[0]?.name
      ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?key=${GOOGLE_API_KEY}&maxWidthPx=400`
      : null,
  }));
};