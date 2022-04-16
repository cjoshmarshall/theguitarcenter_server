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

app.use("/api/auth",require("./routes/auth"))
app.use("/api/users",require("./routes/user"))
app.use("/api/guitars",require("./routes/product"))
app.use("/api/orders",require("./routes/order"))
app.use("/api/cart",require("./routes/cart"))
app.use("/api/checkout",require("./routes/stripe"))

app.get("/",(req,res)=>
    res.send("Connected")
)

app.listen(process.env.PORT || 3006,()=>{
    console.log("Connected")
})