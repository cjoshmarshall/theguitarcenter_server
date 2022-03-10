const router=require("express").Router();
const stripe=require("stripe")(process.env.STRIPE_KEY);

router.post("/payments",(req,res)=>{
    stripe.charges.create({
        source:req.body.tokem,
        amount:req.body.amount,
        currency:"usd"
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{stripeRes}{
            res.status(200).json(stripeRes)
        }
    })
})