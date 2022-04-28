const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    image:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    series:{type:String,required:true},
    description:{type:String,required:true},
    quantity:{type:Number},
    price:{type:Number,required:true},
    specs:{type:Object},
    inStock:{type:Boolean,default:true}
    },
    { timestamps:true }
)

module.exports=mongoose.model("Product",productSchema)