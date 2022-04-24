const router=require("express").Router();
const Newsletter=require("../models/newsletterModel");


router.post("/",async (req,res)=>{
    const newNewsletter=new Newsletter(req.body)
    try{
        const savedNewsletter=await newNewsletter.save()
        res.status(200).json(savedNewsletter)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports=router