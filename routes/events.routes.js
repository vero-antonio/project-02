const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const eventMiddleware = require('../middlewares/event.middlewares');
const upload = require('../configs/multer.config');

router.get('/', 
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests,
  eventsController.list);

router.get('/create', 
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests, 
  eventsController.create);
  
router.post('/create',
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests, 
  upload.single('picture'),
  eventsController.doCreate,
);

router.get('/:id',
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests,
  eventsController.details);

module.exports = router;