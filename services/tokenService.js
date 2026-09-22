


import jwt from "jsonwebtoken"

export const accessToken=async(payload)=>{
  
         return await jwt.sign({id:payload._id,email:payload.email},process.env.ACCESS_SECRET,{expiresIn:"1m"})
  
}


export const refershToken=async(payload)=>{
     return await jwt.sign({id:payload._id,email:payload.email},process.env.REFRESH_SECRET,{expiresIn:"15d"})
}
