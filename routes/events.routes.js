const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const userMiddleware = require('../middlewares/user.middlewares');
const upload = require('../configs/multer.config');

router.get('/event-detail/:id/', eventsController.viewEvent); 
router.get('/event-list', userMiddleware.isAuthenticated,eventsController.listEvent);
router.get('/event-create', userMiddleware.isAuthenticated,eventsController.createEvent);
router.post('/event-create',
  userMiddleware.isAuthenticated,
  upload.single('picture'),
  eventsController.doCreateEvent
);

module.exports = router;