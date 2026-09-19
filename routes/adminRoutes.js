import {Router} from "express"
const adminRoutes=Router()



adminRoutes.get("/",(req,res)=>{
    res.end("admin page")
})
adminRoutes.get("/manageuser",(req,res)=>{
    res.end("admin manageuser page")
})


export default adminRoutes