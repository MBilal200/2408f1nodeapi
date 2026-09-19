


import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import { accessToken, refershToken } from "../services/tokenService.js"
export const signup=async(req,res)=>{
    try {
        //   console.log(req.body)
//check weather the email already exist or not
         const match=await userModel.findOne({email:req.body.email})
         if(match){
           return res.status(409).json({msg:"email already exist"})
         }
//create user
        const user=new userModel(req.body)
        await user.save()
        res.status(201).json({msg:"user created successfull"})

        
    } catch (error) {
        res.status(400).json({msg:"server not avalible"})
    }


}
export const login=async(req,res)=>{
     try {
        // console.log(req.body)
        const user=await userModel.findOne({email:req.body.email})
        // console.log(user)
        if(!user){
           return res.status(404).json({msg:"invalid useremail"})
        }
        //password check
       const frntpass=req.body.password
       const dbpass=user.password
      const match=await bcrypt.compare(frntpass,dbpass)
    //   console.log(match)
    if(!match){
       return res.status(400).json({msg:"invalid credential"})
    }
    const acc=await accessToken(user)
    const ref=await refershToken(user)
    res.cookie("reftoken",ref,{httponly:true})
    res.status(200).json({msg:"login successfull...",access:acc})

    } catch (error) {
        res.status(400).json({msg:"user not found",error:error})
    }
}
export const logout=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}