const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middlewares');

router.get('/categories', userMiddleware.isAuthenticated, usersController.categories);
router.post('/categories', userMiddleware.isAuthenticated,usersController.updateCategories);

module.exports = router;




