import {Router} from "express"
import { createpage, deletepage, showbyid, updatepage, userpage } from "../controllers/userController.js"
import Authenticate from "../middleware/authenticate.js"
const userRoutes=Router()

userRoutes.get("/",Authenticate,userpage)
userRoutes.get("/showid/:id",Authenticate,showbyid)
userRoutes.post("/create",Authenticate,createpage)
userRoutes.put("/update/:id",Authenticate,updatepage)
userRoutes.delete("/delete/:id",Authenticate,deletepage)

export default userRoutes
