const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const upload = require('../configs/multer.config');

router.get('/event', eventsController.viewEvent); 
router.get('/create-event', userMiddleware.isAuthenticated,eventsController.createEvent);
router.post('/create-event',
  userMiddleware.isAuthenticated,
  upload.single('picture'),
  eventsController.doCreateEvent
);

module.exports = router;