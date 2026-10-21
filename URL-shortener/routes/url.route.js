const express = require("express")
const { generateNewShortURL } = require("../controllers/url.controller")
const router = express.Router()
const urlModel = require("../models/url.model")

router.post("/",generateNewShortURL)

router.get("/:shortId",async(req,res)=>{
    const shortId    = req.params.shortId;
    // console.log(body);
    
    const entry = await urlModel.findOne({shortId})
    console.log(entry);
    
    res.redirect(entry.redirectUrl)
    
})

module.exports = router