//동선 추천 Controller

const { generateRoutePlan } = require('../services/gptRouteService');

exports.getRecommendedRoute = async (req, res) => {
  const { city, landmarks, startDate, endDate } = req.body;

  if (!city || !landmarks || !startDate || !endDate) {
    return res.status(400).json({ error: '필수 파라미터가 누락되었습니다.' });
  }

  try {
    const itinerary = await generateRoutePlan(city, landmarks, startDate, endDate);
    res.json({ itinerary });
  } catch (err) {
    console.error('[동선 추천 에러]', err.message);
    res.status(500).json({ error: 'GPT 동선 추천에 실패했습니다.' });
  }
};