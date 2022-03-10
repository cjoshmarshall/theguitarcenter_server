const router=require("express").Router();
const Cart=require("../models/cart");
const { verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin }=require("./verifyToken")


router.post("/",verifyToken,async (req,res)=>{
    const newCart=new Cart(req.body)
    try{
        const savedCart=await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id",verifyTokenAndAuth,async (req,res)=>{
    try{
        const updatedCart=await Cart.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedCart)
    }catch(err){ 
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyTokenAndAuth,async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/find/:userId",verifyTokenAndAuth,async(req,res)=>{
    try{
        const cart=await Cart.findOne({userId:req.params.userid})
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",verifyTokenAndAuth,async(req,res)=>{
    try{
        const cart=await Cart.find()
        res.status(200).json(cart)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router