require('dotenv').config();
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const getPhotoUrl = (photoReference, maxwidth = 400) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxwidth}&photoreference=${photoReference}&key=${GOOGLE_API_KEY}`;
};

exports.searchPlaces = async (query) => {
  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

  const response = await axios.get(url, {
    params: {
      query: `${query} 관광지`,
      key: GOOGLE_API_KEY,
      language: 'ko',
    },
  });

  return response.data.results.map(place => ({
    name: place.name,
    address: place.formatted_address,
    rating: place.rating,
    location: place.geometry.location,
    place_id: place.place_id,
    photo: place.photos?.[0]
      ? getPhotoUrl(place.photos[0].photo_reference)
      : null,
  }));
};