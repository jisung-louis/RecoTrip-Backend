const { fetchHotelsByCity } = require('../services/googleHotelService');

exports.getHotelsByCity = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'city 파라미터가 필요합니다.' });
  }

  try {
    const hotels = await fetchHotelsByCity(city);
    res.json({ hotels });
  } catch (err) {
    console.error('[호텔 API 에러]', err.message);
    res.status(500).json({ error: '호텔 정보를 가져오는 데 실패했습니다.' });
  }
};