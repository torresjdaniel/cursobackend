const express = require("express");
const router = express.Router();
const session= require("express-session");
const {passport} = require('../middlewares/passport');
const cookieParse = require("cookie-parser");

const path = require("path");
const mdw = require("../middlewares/authMdw");
require("dotenv").config();



router.use(cookieParse());
router.use(session({
    secret:"shhhhhhhhhhhhhhhhhhhhhh",
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:600000
    }

}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/",mdw.validarSession,(req, res)=>{
    res.status(301).sendFile(path.join(__dirname,"..","public/index.html"));

})


router.get("/login",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/login.html"));
})  

router.post("/login",passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/' }));


router.get("/faillogin",(req, res)=>{
    res.json("'estado': 'fallo ok'");
}) 

router.get("/register",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/register.html"));
})  

router.post("/register",passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/login' }))

router.get("/failregister",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/failregister.html"));
}) 

router.get("/logout",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/logout.html"));
}) 

router.post("/logout",mdw.validarSession,(req, res)=>{
    req.logout();
    req.session.destroy();
})

module.exports = router;