const express = require('express');
const { updatePreferences, getPreferences } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/preferences', auth, getPreferences);
router.put('/preferences', auth, updatePreferences);

module.exports = router;