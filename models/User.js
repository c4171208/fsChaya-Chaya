const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    
    
    name:{
        type:String,
        required:true,
          unique:true,
    },
    phone:{
        type:String
    },

    
    email:{
        type:String,
        lowercase:true,
        trim:true,
    },

    
},{timestamps:true})
module.exports=mongoose.model("User",userSchema)
