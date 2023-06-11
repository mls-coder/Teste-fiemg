const express = require("express");
const router = express.Router();
const authService = require("./auth.service")


router.post("/",async function(req,res){
    try{
        const data = await authService.login(req.body)
        res.status(200).send(data)
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router;