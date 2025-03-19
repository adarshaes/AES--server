const express = require("express");
const router = express.Router();
const reviewModel = require("../models/reviewModel");
const jwt = require("jsonwebtoken");

router.post("/", async(req,res)=>{
  const {from, data, star, teacher} = req.body;
  try{
    const token = await process.env.JWT_KEY;
    const decoded = await jwt.verify(from, token);
    const fromId = decoded.id;
    let newReview = await reviewModel.create({
        from: fromId,
        data,
        rating: star,
        teacher
    })

    res.status(200).json({ msg: "Review sucessfull" });
    console.log(newReview)

  }catch(err){
    console.log(err)
    alert("Something went wrong!")
  }
})

module.exports = router;