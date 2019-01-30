const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionController = require('../controllers/session.controller');
const userMiddleware = require('../middlewares/user.middlewares');

router.get('/login', usersController.login);
router.post('/facebook', passport.authenticate('facebook-auth', { scope: ['email'] }, ));
router.get('/:provider/cb', usersController.doLogin);