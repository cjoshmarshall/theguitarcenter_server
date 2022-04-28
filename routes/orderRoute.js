const router=require("express").Router();
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const Order=require("../models/orderModel");
const { verifyToken,verifyTokenAndAuth, verifyTokenAndAdmin }=require("./verifyToken")


router.post("/",async (req,res)=>{
    try{
        const customer=await stripe.customers.create({
            source:req.body.tokenId,
            email:req.body.email
        })
        const payment=await stripe.paymentIntents.create({            
            amount:req.body.amount,
            currency:"usd",
            customer:customer.id,
            receipt_email:req.body.email
        },
        {
            idempotencyKey:uuidv4()
        })
        if(payment){
            req.body.transactionId=payment.id
            const newOrder=new Order(req.body)
            const savedOrder=await newOrder.save()
            return res.status(200).json(savedOrder)
        }else{
            return res.status(400).json(err)
        }
    }catch(err){
        res.status(500).json(err)
    }
})

router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const updatedOrder=await Order.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedOrder)
    }catch(err){ 
        res.status(500).json(err)
    }
})

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/find/:userId",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const orders=await Order.findOne({userId:req.params.userId})
        res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        const Orders=await Order.find()
        .populate("products")
        res.status(200).json(Orders)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router