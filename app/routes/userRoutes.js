const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/:userId/profile', userController.getProfile);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/:userId/photo', upload.single('photo'), userController.uploadPhoto);
router.put('/:userId/profile', userController.updateProfile);

module.exports = router;
