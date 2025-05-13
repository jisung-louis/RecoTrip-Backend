const { fetchHotelsByCity } = require('../services/googleHotelService');

exports.getHotelsByCity = async (req, res) => {
  const { lat, lng, radius = 1500 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat, lng 파라미터가 필요합니다.' });
  }

  try {
    const hotels = await fetchHotelsByCity(Number(lat), Number(lng), Number(radius));
    res.json({ hotels });
  } catch (err) {
    console.error('[호텔 API 에러]', err.message);
    res.status(500).json({ error: '호텔 정보를 가져오는 데 실패했습니다.' });
  }
};