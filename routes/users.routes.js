const express = require('express');
const router = express.Router();
// const constants = require('../constants');
const usersController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middlewares');

router.get('/home', /*userMiddleware.haveInterests,*/ usersController.home); // is Authenticated
router.get('/categories', usersController.categories);

module.exports = router;




