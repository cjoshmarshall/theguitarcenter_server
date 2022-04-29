const router=require("express").Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");
const { verifyToken } = require("./verifyToken");

router.post("/signup",async (req,res)=>{
    const {fname,lname,email,password}=req.body

    const salt=await bcrypt.genSalt();
    hashedPassword=await bcrypt.hash(password,salt)
        
    const newUser=await new User({
        fname,lname,email,password:hashedPassword
    })

    try{
        const savedUser=await newUser.save()
        res.status(200).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})


router.post("/login",async (req,res)=>{

    const {email,password}=req.body

    try{
        const user=await User.findOne({email})
        const match=await bcrypt.compare(req.body.password,user.password)
        const accessToken=jwt.sign(
            {
                id:user._id,
                isAdmin:user.isAdmin
            },
            process.env.JWT,
            {expiresIn:"3d"}
        )
        const { password,...others }=user._doc;
        if(!user || !match){
            res.status(401).json("Incorrect Email or Password")
        }else{
            res.status(200).json({...others,accessToken})
        }

    }catch(err){
        res.status(500).json(err)
    }
})




module.exports=router