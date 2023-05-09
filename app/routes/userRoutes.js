const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const { authenticateToken } = require('../middlewares/auth');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/:userId/photo', upload.single('photo'), userController.uploadPhoto);
router.put('/:userId/profile', userController.updateProfile);

// Protected route that requires authentication
router.get('/:userId/profile', authenticateToken, userController.getProfile);

module.exports = router;
