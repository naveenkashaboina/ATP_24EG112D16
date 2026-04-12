import exp from 'express'
export const adminApp=exp.Router()
import { verifyToken } from '../middleWares/VerifyToken.js'
import { articleModel } from '../models/ArticleModel.js'
import { userModel } from '../models/UserModel.js'

// read all atricle of all authors even in-active
adminApp.get("/articles",verifyToken("ADMIN"),async(req,res)=>{
    //read articles
    const articlesList=await articleModel.find()
    //send res
    return res.status(200).json({message:"Articles list is :",payload:articlesList})
})

// change state of user or author active-inActive
adminApp.put("/state",verifyToken("ADMIN"),async(req,res)=>{
    //get user mail and state to be changed from req
    let { mail , toBeActive }=req.body
    //find user wrt given mail id
    const userDoc = await userModel.findOne({email:mail})
    if(!userDoc) //if email is invalid
        return res.status(404).json({message:"User not found"})
    if(userDoc.isUserActive==toBeActive) //if user is already in same state
        return res.status(200).json({message:"User is already in same state"})
    else //changing user state
        userDoc.isUserActive= toBeActive;
        await userDoc.save()
    return res.status(200).json({message:" user state updated"})

})