const {nanoid} = require("nanoid")
const url = require("../models/url.model")

async function generateNewShortURL(req,res) {
    const shortID = nanoid(8);
    const body = req.body
    if(!body.url){
        return res.json({msg:"no body"})
    }

    await url.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory:[]
    });
    return res.json( {
        id:shortID
    })
    
}

module.exports = { generateNewShortURL }