// GPT 호출 로직을 정의한 서비스 불러오기
const { getRecommendedCities } = require('../services/gptService');

// 도시 추천 요청을 처리하는 컨트롤러 함수
exports.recommendCities = async (req, res) => {
  try {
    const { keywords } = req.body;

    // 키워드 배열이 없거나 비어있을 경우 에러 처리
    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return res.status(400).json({ error: 'keywords (array) is required' });
    }

    // GPT + Firestore 기반 추천 함수 호출
    const cities = await getRecommendedCities(keywords);

    // 응답으로 도시 리스트 반환
    res.json({ cities });

  } catch (err) {
    console.error('GPT Error:', err.message);
    res.status(500).json({ error: 'Failed to get city recommendations' });
  }
};