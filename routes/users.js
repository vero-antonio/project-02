const express = require('express');
const router = express.Router();
// const constants = require('../constants');
const passport = require('passport');
const usersController = require('../controllers/users.controller');

router.get('/login', usersController.login);

router.post('/facebook', passport.authenticate('facebook-auth', { scope: ['email'] }));

router.get('/:provider/cb', usersController.createWithIDPCallback);


module.exports = router;




