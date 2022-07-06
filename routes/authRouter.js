const express = require("express");
const router = express.Router();
const mdw = require("../middlewares/authMdw");
const {passport} = require('../middlewares/passport');
const authController = require('../controllers/authController');

router.get("/",mdw.validarSession, authController.getIndex);
router.get("/login", authController.getLogin)  
router.post("/login",passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/' }), authController.postLogin);
router.get("/faillogin", authController.getFailLogin) 
router.get("/register", authController.getRegister);  
router.post("/register",passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/login' }), authController.postRegister);
router.get("/failregister", authController.getFailRegister); 
router.get("/logout", authController.getLogOut) 
router.post("/logout",mdw.validarSession, authController.postLogOut)

module.exports = router;