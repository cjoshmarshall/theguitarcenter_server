const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true,unique:true},
    products:[{type:mongoose.Schema.Types.ObjectId,ref:"Product",unique:true}],
    amount:{type:Number,required:true},
    status:{type:String,default:"Order Placed"},
    transactionId:{type:String},
    },
    { timestamps:true }
)

module.exports=mongoose.model("Order",orderSchema)