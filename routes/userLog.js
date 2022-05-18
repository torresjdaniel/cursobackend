const express = require("express");
const router = express.Router();
const session= require("express-session");
const cookieParse = require("cookie-parser");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const path = require("path");
const mdw = require("../middlewares/authMdw");
require("dotenv").config();



router.use(cookieParse());
router.use(session({

    store: MongoStore.create({
        mongoUrl: process.env.stringNoSql,
        mongoOptions: advancedOptions
    }),
    secret:"shhhhhhhhhhhhhhhhhhhhhh",
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:600000
    }

}));

router.get("/",mdw.validarSession,(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/index.html"));

})

router.get("/login",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/login.html"));
})  

router.post("/login",(req, res)=>{

    let {nombre} = req.body;   
    if(nombre){
        req.session.nombre = {nombre:nombre};
        return res.json({nombre});
    }

    return res.json({status:"error", });
})

router.get("/logout",(req, res)=>{
    res.sendFile(path.join(__dirname,"..","public/logout.html"));
}) 

router.post("/logout",mdw.validarSession,(req, res)=>{
    req.session.destroy();
    res.status(200);
})

module.exports = router;