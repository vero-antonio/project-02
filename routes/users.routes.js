const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middlewares');

router.get('/profile', userMiddleware.isAuthenticated,usersController.profile);
router.post('/profile', userMiddleware.isAuthenticated,usersController.profileUpdate);

module.exports = router;




