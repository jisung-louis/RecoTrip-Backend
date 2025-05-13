const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

/**
 * @swagger
 * /api/hotels:
 *   get:
 *     summary: 좌표 기반 호텔 정보 조회
 *     tags: [Hotel]
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: 위도
 *       - in: query
 *         name: lng
 *         schema:
 *           type: number
 *         required: true
 *         description: 경도
 *       - in: query
 *         name: radius
 *         schema:
 *           type: number
 *         required: false
 *         description: 검색 반경(미터, 기본값 1500)
 *     responses:
 *       200:
 *         description: 호텔 리스트 반환
 */

// 좌표 기준으로 호텔 정보 조회
router.get('/', hotelController.getHotelsByCity);

module.exports = router;