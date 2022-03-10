const express=require("express");
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv")

const authRoute=require("./routes/auth");
const userRoute=require("./routes/user");
const productRoute=require("./routes/product")
const orderRoute=require("./routes/order");
const cartRoute=require("./routes/cart");
const stripeRoute=require("./routes/stripe")

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBConnected"))
    .catch((err)=>{
        console.log(err)
    })

app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/guitars",productRoute)
app.use("/api/orders",orderRoute)
app.use("/api/cart",cartRoute)

app.get("/",(req,res)=>
    res.send("Connected")
)

app.listen(process.env.PORT || 3006,()=>{
    console.log("Connected")
})