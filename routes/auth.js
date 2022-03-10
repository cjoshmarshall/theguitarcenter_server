const router=require("express").Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const User=require("../models/user");

router.post("/signup",async (req,res)=>{
        const salt=await bcrypt.genSalt();
        req.body.password=await bcrypt.hash(req.body.password,salt)

    const newUser= await new User({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password:req.body.password
    })

    try{
        await newUser.save()
        res.status(200).json(newUser)
    }catch(err){
        res.status(500).json(err)
    }
})


router.post("/login",async (req,res)=>{

    try{
        const user=await User.findOne({email:req.body.email})
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