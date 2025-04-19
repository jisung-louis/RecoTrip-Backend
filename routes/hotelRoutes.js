const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: 도시 기반 호텔 정보 조회
 *     tags: [Hotel]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: 도시 이름
 *     responses:
 *       200:
 *         description: 호텔 리스트 반환
 */

// 도시 기준으로 호텔 정보 조회
router.get('/', hotelController.getHotelsByCity);

module.exports = router;