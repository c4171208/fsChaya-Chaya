import Joi from "joi";
import mongoose from "mongoose";

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
export const User = mongoose.model("User", userSchema)


export const userValidatorAddUser = (_user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone:Joi.string().phone().required()
    });}
    export const userValidatorUpDateUser = (_user) => {
        const schema = Joi.object({
            name: Joi.string().min(3).max(30),
            email: Joi.string().email(),
            phone:Joi.string().phone()
        });
    
    return schema.validate(_user);
}