const express = require("express");
const router = express.Router();
const session= require("express-session");
const {passport} = require('../middlewares/passport');
const cookieParse = require("cookie-parser");
const {logger} = require('../model/loggerModel');

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
    logger.info(`ruta: / | metodo: GET | res: index.html`)

})


router.get("/login",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/login.html"));
    logger.info(`ruta: /login | metodo: GET | res: login.html `);
})  

router.post("/login",passport.authenticate('login', {failureRedirect: '/faillogin', successRedirect: '/' }), (req, res)=>{
    logger.info(`ruta: /login | metodo: POST | authenticate(login) `);
});


router.get("/faillogin",(req, res)=>{
    res.json("'estado': 'fallo ok'");
    logger.info(`ruta: /faillogin | metodo: GET | res: 'estado': 'fallo ok' `);
}) 

router.get("/register",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/register.html"));
    logger.info(`ruta: /register | metodo: GET | res: register.html `);
})  

router.post("/register",passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/login' }), (req, res) =>{
    logger.info(`ruta: /register | metodo: POST | authenticate(register) `);
})

router.get("/failregister",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/failregister.html"));
    logger.info(`ruta: /failregister | metodo: GET | res: failregister.html `);
}) 

router.get("/logout",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/pages/logout.html"));
    logger.info(`ruta: /logout | metodo: GET | res: logout.html `);
}) 

router.post("/logout",mdw.validarSession,(req, res)=>{
    req.logout();
    req.session.destroy();
    logger.info(`ruta: /logout | metodo: POST | logout()`);
})

module.exports = router;