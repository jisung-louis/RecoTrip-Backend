const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const GPT_API_KEY = process.env.GPT_API_KEY;

exports.generateRoutePlan = async (city, landmarks, startDate, endDate) => {
  const prompt = `
도시: ${city}
여행 기간: ${startDate} ~ ${endDate}
관광지 목록: ${landmarks.join(', ')}

이 정보를 바탕으로 ${startDate}부터 ${endDate}까지의 여행 일정을 계획해줘.
- 각 날짜별로 오전, 오후, 저녁으로 나눠서 관광지를 배치해줘
- 관광지 간 이동 시간과 거리를 고려해줘
- 형식은 JSON 배열로 보여줘
예시:
[
  {
    "day": 1,
    "date": "2025-04-10",
    "places": [
      "오전: 도쿄 스카이트리 방문",
      "오후: 아사쿠사 관람",
      "저녁: 시부야 스크램블 크로싱"
    ]
  },
  {
    "day": 2,
    "date": "2025-04-11",
    "places": [
      "오전: 우에노 공원 산책",
      "오후: 도쿄 국립박물관 관람",
      "저녁: 긴자 쇼핑"
    ]
  }
]
`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '당신은 여행 일정을 계획하는 전문가입니다. 주어진 정보를 바탕으로 최적의 여행 일정을 만들어주세요.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    const itinerary = JSON.parse(content);
    return itinerary;
  } catch (error) {
    console.error('GPT API 호출 에러:', error);
    throw new Error('GPT 응답을 파싱할 수 없습니다.');
  }
};