const express = require('express');
const router = express.Router();
const { generatePDF } = require('../controllers/reportController');

// POST /api/reports/generate-pdf - Generar reporte PDF
router.post('/generate-pdf', generatePDF);

module.exports = router;