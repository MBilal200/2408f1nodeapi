import mongoose from "mongoose";


const db=async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("db connceted")
}

export default db