const express = require('express');
const router = express.Router();
const passport = require('passport');
const sessionController = require('../controllers/session.controller');

router.get('/login', sessionController.login);
router.post('/facebook', passport.authenticate('facebook-auth', { scope: ['email'] }, ));
router.get('/:provider/cb', sessionController.doLogin);
router.get('/delete', sessionController.delete);

module.exports = router;