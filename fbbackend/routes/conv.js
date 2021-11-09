const router = require("express").Router();
const Conversation = require("../models/Conversation");



router.get("/",(req,res)=>{
    res.send("you are watching pron");
})



module.exports = router;