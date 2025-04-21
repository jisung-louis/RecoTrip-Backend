const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

/**
 * @swagger
 * /api/weather:
 *   get:
 *     summary: 도시 및 날짜 기반 날씨 조회
 *     tags: [Weather]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: 도시 이름
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: 조회할 날짜 (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: 날씨 정보 반환
 */
router.get('/', weatherController.getWeather);

module.exports = router;