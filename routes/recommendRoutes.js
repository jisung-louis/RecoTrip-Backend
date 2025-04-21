// 추천 관련 라우터
const express = require('express');
const router = express.Router();

// 컨트롤러: 도시 추천, 동선 추천
const recommendController = require('../controllers/recommendController');
const routeController = require('../controllers/routeController');

/**
 * @swagger
 * /api/recommend/city:
 *   post:
 *     summary: GPT 기반 도시 추천
 *     tags: [Recommend]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: 추천된 도시 리스트
 */
router.post('/city', recommendController.recommendCities);

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