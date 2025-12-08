const express = require('express');
const router = express.Router();
const { suggestRecipes } = require('../controllers/aiController');
const { authenticate } = require('../middlewares/auth');

router.post('/suggest', authenticate, suggestRecipes);

module.exports = router;

