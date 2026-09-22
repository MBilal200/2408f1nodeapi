


import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
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
export const refresh=async(req,res)=>{
    try {
        const ref=req.cookies.reftoken
       const match= jwt.verify(ref,process.env.REFRESH_SECRET)
       if(!match){
        return res.status(400).json({msg:"invalid token"})
       }
      const acc= jwt.sign({id:match.id,email:match.email},process.env.ACCESS_SECRET,{expiresIn:"15m"})

      res.status(200).json({msg:"new access token generated",accesstoken:acc})

    } catch (error) {
        res.status(400).json({msg:"cookie error"})
    }
}
export const logout=async(req,res)=>{
    try {
        res.clearCookie("reftoken")
        res.status(200).json({msg:"logout successfull....."})
    } catch (error) {
        res.status(400).json({msg:"invalid token"})
    }
}