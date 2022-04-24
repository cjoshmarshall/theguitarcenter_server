const router=require("express").Router();
const Category=require("../models/categoryModel");
const { verifyTokenAndAdmin }=require("./verifyToken")


router.post("/",verifyTokenAndAdmin,async (req,res)=>{
    const newCategory=new Category(req.body)
    console.log(newCategory)
    try{
        const savedCategory=await newCategory.save()
        console.log(savedCategory)
        res.status(200).json(savedCategory)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        const category=await Category.find()
        res.status(200).json(category)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router