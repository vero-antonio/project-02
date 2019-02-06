const express = require('express');
const router = express.Router();
const constants = require('../constants');
const usersController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const upload = require('../configs/multer.config');

router.get('/home', userMiddleware.isAuthenticated,userMiddleware.haveInterests, usersController.home); 
router.get('/categories', userMiddleware.isAuthenticated,usersController.categories);
router.post('/categories', userMiddleware.isAuthenticated,usersController.updateCategories);
// router.get('/create-event', userMiddleware.isAuthenticated,usersController.createEvent);
// router.post('/create-event',
//   userMiddleware.isAuthenticated,
//   upload.single('picture'),
//   usersController.doCreateEvent
// );

module.exports = router;




