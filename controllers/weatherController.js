const { getWeatherByCityAndDate } = require('../services/weatherService');

exports.getWeather = async (req, res) => {
  const { city, date } = req.query;

  if (!city || !date) {
    return res.status(400).json({ error: 'city와 date는 필수입니다.' });
  }

  try {
    const weather = await getWeatherByCityAndDate(city, date);
    res.json({ weather });
  } catch (err) {
    console.error('[날씨 API 에러]', err.message);
    res.status(500).json({ error: err.message });
  }
};