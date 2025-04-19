require('dotenv').config();
const axios = require('axios');

const GPT_API_KEY = process.env.GPT_API_KEY;

exports.generateRoutePlan = async (city, date, landmarks, hotels) => {
  const prompt = `
도시: ${city}
날짜: ${date}
관광지 목록: ${landmarks.join(', ')}
선택 가능한 호텔: ${hotels.join(', ')}

이 정보를 바탕으로 하루짜리 여행 일정을 계획해줘.
- 오전, 오후, 저녁으로 나눠서 관광지를 배치해줘
- 숙소는 호텔 목록 중 하나에서 선택해줘
- 형식은 JSON 배열로 보여줘
예시:
[
  {
    "day": 1,
    "date": "2025-04-10",
    "plan": [
      "오전: 에펠탑 방문",
      "오후: 루브르 박물관 관람",
      "저녁: 개선문 근처 식사",
      "숙박: 호텔 르 뫼리스"
    ]
  }
]
`;

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '당신은 여행 동선을 짜주는 전문가입니다.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${GPT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const content = response.data.choices[0].message.content;

  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error('GPT 응답을 파싱할 수 없습니다.');
  }
};