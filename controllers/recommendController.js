// GPT 호출 로직을 정의한 서비스 불러오기
const { getRecommendedCities } = require('../services/gptService');

// 도시 추천 요청을 처리하는 컨트롤러 함수
exports.recommendCities = async (req, res) => {
  try {
    const { prompt } = req.body;

    // 사용자가 프롬프트를 안 보냈을 경우 에러 처리
    if (!prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    // GPT 서비스 함수 호출 → 도시 리스트 반환
    const cities = await getRecommendedCities(prompt);

    // 응답으로 도시 리스트 반환
    res.json({ cities });

  } catch (err) {
    console.error('GPT Error:', err.message);

    // 예외 발생 시 에러 응답
    res.status(500).json({ error: 'Failed to get city recommendations' });
  }
};