

import userModel from "../models/userModel.js"

export const userpage=async(req,res)=>{
    try {
      const users= await userModel.find()
      res.status(200).json({data:users})
    } catch (error) {
        res.status(500).json({msg:"db not avalible"})
    }
   
}
export const showbyid=async(req,res)=>{
    try {
      const users= await userModel.findById(req.params.id)
      res.status(200).json({data:users})
    } catch (error) {
        res.status(500).json({msg:"db not avalible"})
    }
   
}
export const createpage=async(req,res)=>{
    // console.log(req.body)
    try {
        const user=new  userModel(req.body)
        await user.save()
        res.status(201).json({msg:"user created successfull..."})
    } catch (e) {
        res.status(500).json({msg:"validation failed",reason:e})
    }
}

export const updatepage=async(req,res)=>{
    try {
        const user=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({msg:"user update successfull",data:user})
    } catch (error) {
        res.status(500).json({msg:"update error"})
    }
}
export const deletepage=async(req,res)=>{

    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"user deleted"})
    } catch (error) {
        
    }
   
}