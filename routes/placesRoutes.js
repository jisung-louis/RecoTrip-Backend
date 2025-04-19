const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

/**
 * @swagger
 * /api/places:
 *   get:
 *     summary: 도시 기반 관광지 조회
 *     tags: [Places]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: true
 *         description: 도시 이름
 *     responses:
 *       200:
 *         description: 관광지 리스트 반환
 */
router.get('/', placesController.getPlaces);

module.exports = router;