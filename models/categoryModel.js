const mongoose=require("mongoose")

const categorySchema=new mongoose.Schema({
    image:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    category:{type:String,required:true}
    },
    { timestamps:true }
)

module.exports=mongoose.model("Category",categorySchema)