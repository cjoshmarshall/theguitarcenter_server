const express=require("express");
const cors=require("cors")
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv")



dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("DBConnected"))
    .catch((err)=>{
        console.log(err)
    })

app.use(express.json())
app.use(cors())

app.use("/api/auth",require("./routes/authRoute"))
app.use("/api/users",require("./routes/userRoute"))
app.use("/api/categories",require("./routes/categoryRoute"))
app.use("/api/guitars",require("./routes/productRoute"))
app.use("/api/orders",require("./routes/orderRoute"))
// app.use("/api/cart",require("./routes/cartRoute"))
app.use("/api/newsletter",require("./routes/newsletterRoute"))

app.get("/",(req,res)=>
    res.send("Connected")
)

app.listen(process.env.PORT || 3006,()=>{
    console.log("Connected")
})