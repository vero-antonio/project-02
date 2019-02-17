const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.controller');
const userMiddleware = require('../middlewares/user.middlewares');
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

router.get('/detail/:id',
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests,
  eventsController.details);

router.post('/:id/delete',
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests,
  eventsController.doDelete);

router.post('/:id/join',
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests,
  eventsController.join);

router.post('/:id/leave',
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests,
  eventsController.doLeave);

router.get('/myEvents',
  userMiddleware.isAuthenticated,
  userMiddleware.haveInterests,
  eventsController.myEvents);

module.exports = router;