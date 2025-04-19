const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController');

/**
 * @swagger
 * /api/recommend/route:
 *   post:
 *     summary: GPT 기반 여행 경로 추천
 *     tags: [Recommend]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               landmarks:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: 추천된 여행 경로
 */
router.post('/route', routeController.getRecommendedRoute);

module.exports = router;