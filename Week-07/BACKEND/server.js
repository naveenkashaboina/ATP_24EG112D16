import exp from 'express'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import { userApp } from './APIs/UserAPI.js'
import { adminApp } from './APIs/AdminAPI.js'
import { authorApp } from './APIs/AuthorAPI.js'
import { commonApp } from './APIs/CommonAPI.js'
import CookieParser from 'cookie-parser'

config()
//create express app
const app=exp()
//enable cors

//body parser middleware
app.use(exp.json())
//cookie parser middleware
app.use(CookieParser())

//path level middlewares
app.use("/user-api",userApp)
app.use("/author-api",authorApp)
app.use("/admin-api",adminApp)
app.use("/auth",commonApp)

//CONNECT TO DB
const connectDB = async()=>{
    try{
        await connect (process.env.DB_URL);
        console.log("DB server Connected")
        //assign port
        const port=process.env.PORT ||  4000;
        app.listen(port,()=> console.log(`running in port no ${port}`))
    }catch(err)
    {
        console.log(err)
    }
}

connectDB()
// to handle API invalid path errors
app.use((req,res,next)=>{
    res.status(404).json({message:`path ${req.url} not found`})
})
// to handle errors
app.use((err,req,res,next)=>{  //executed only when error occured should be written at last order matters
    //RESPOND TO EACH ERROR FOR GOOD USER EXPERIENCE
    //validation error
    if(err.name=="ValidationError")
        return res.status(400).json({message:'ValidationError occurred',error:err.message})
    //cast error
    if(err.name=="CastError")
        return res.status(400).json({message:'error occurred',error:err.message})
    //server side error
    return res.status(500).json({message:'error occurred',error:err.message})
})
