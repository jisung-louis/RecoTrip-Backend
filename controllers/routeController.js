//동선 추천 Controller

const { generateRoutePlan } = require('../services/gptRouteService');

exports.getRecommendedRoute = async (req, res) => {
  const { city, date, landmarks, hotels } = req.body;

  if (!city || !date || !landmarks || !hotels) {
    return res.status(400).json({ error: 'city, date, landmarks, hotels는 모두 필요합니다.' });
  }

  try {
    const itinerary = await generateRoutePlan(city, date, landmarks, hotels);
    res.json({ itinerary });
  } catch (err) {
    console.error('[동선 추천 에러]', err.message);
    res.status(500).json({ error: 'GPT 동선 추천에 실패했습니다.' });
  }
};