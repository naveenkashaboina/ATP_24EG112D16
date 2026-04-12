//create express app
import exp, { response } from 'express'
import {connect} from 'mongoose'
import { empApp } from './APIs/employeeAPI.js'
import { config } from 'dotenv';
import cors from 'cors';
config();//process .env.PORT,process.env.DB_URL

const app = exp()
//add cors middleware
app.use(cors({
  origin:['http://localhost:5173']
}))
app.use(exp.json());
//forward req to empApp if path starts with /employee-api
app.use('/employee-api',empApp);
//connect to DB server
const port = process.env.PORT||3000
async function connectDB(){
  try{
  await connect(process.env.DB_URL)
  console.log("DB connection success")

  //start server
  app.listen(port,()=>{
  console.log("server on port 3000..")
})

}catch(err){
  console.log("err in DB connection : ",err)
}
}
connectDB();

//error handling middleware
app.use((err,req,res,next)=>{
  console.log(err)

  if(err.name==="ValidationError"){
    return res.status(400).json({message:"error occured ",error:err.message})
  }
  if(err.name==="CastError"){
    return res.status(400).json({message:"error occured ",error:err.message})
  }

  //send server side error 
  res.status(500).json({message:"error occurred",error:"server side error"})


})

//error =>{name,message,callstack}