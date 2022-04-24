const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
    products:[{
        productId:{type:String},
        quantity:{type:Number,default:1}
    }],
    amount:{type:Number,required:true},
    status:{type:String,default:"Order Placed"},
    transactionId:{type:String},
    },
    { timestamps:true }
)

module.exports=mongoose.model("Order",orderSchema)