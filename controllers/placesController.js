const { searchPlaces } = require('../services/googlePlaces');

exports.getPlaces = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }

  try {
    const places = await searchPlaces(query);
    res.json({ results: places.slice(0, 20) }); // 장소 추천 개수 순위별로 개수 조절
  } catch (err) {
    console.error('Places API Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch places' });
  }
};