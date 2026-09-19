



import {Schema,model} from "mongoose";
import bcrypt from "bcryptjs";
//schema
const userschema=new Schema({
    name:{
        type:String,
        required:[true,"name is required    `"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        
    },
    password:String,
    contact:String,
    gender:{
        type:String,
       
    }
})
userschema.pre("save",async function(){
    const oldpass=this.password//old password
    this.password=await bcrypt.hash(oldpass,10)
})


//model
const userModel=model("users",userschema)
export default userModel