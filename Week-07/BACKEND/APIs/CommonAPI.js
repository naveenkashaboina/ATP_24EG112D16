import exp from 'express'
import {userModel} from '../models/UserModel.js'
export const commonApp=exp.Router()
import { verifyToken } from '../middleWares/VerifyToken.js'
import { config } from 'dotenv'
import { hash,compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
const {sign}=jwt

config() //for hiding sensitive data via .env 

//route for register
commonApp.post('/users',async(req,res)=>{
    let allowedRoles=["USER","AUTHOR"]
    // get user from req
    const newUser=req.body
    // check role
    if(!allowedRoles.includes(newUser.role))
        return res.status(400).json({message:"Invalid role"})
    //hash password and replace plain with hashed one
    newUser.password=await hash(newUser.password,12)
    //create new user document
    const userDoc=new userModel(newUser)
    //save document
    const result=await userDoc.save()
    //send res
    res.status(201).json({message:"user created sucessfully"})
})

//route for login
commonApp.post('/login',async(req,res)=>{
    // extract user details from req body
    const {email,password}=req.body
    //check if email exists
    const user=await userModel.findOne({email:email})
    if(!user)
        return res.status(400).json({message:"iNVALID EMAIL"})
    //COMPARE PASSWORD
    const isMatched=await compare(password,user.password)
    if(!isMatched)
        return res.status(400).json({message:"Incorrect Password"})
    //create jwt
    const signedToken=sign({id:user._id,email:user.email,role:user.role},process.env.SECRET_KEY,{expiresIn:"1h"})
    //store token as http Only cookie
    res.cookie("token",signedToken,{        //makes changes in res obj
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    //remove password from user doc
    let userObj=user.toObject();       //converting DB doc to js Obj
    delete userObj.password;
    //Send res
    res.status(200).json({message:"login successs",payload:userObj})
})

//route for logout
commonApp.get("/logout",(req,res)=>{
    //delete token from cookie storage
    res.clearCookie( "token" ,{
        httpOnly:true,
        sameSite:"lax",
        secure:false
    })
    res.status(200).json({message:"Logout Success"})
})

//page refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user,
  });
});

//route to change password
commonApp.put("/password",verifyToken("USER","AUTHOR","AUTHOR"),async(req,res)=>{

    const {currentPwd,newPwd }=req.body
    //check new pwd and current pwd are diff
    if(currentPwd===newPwd)
        return res.status(400).json({message:"new pwd must differ from current pwd"})
    //getting current user from req.cookies
    const currentUserEmail=req.user?.email
    const currentUserDoc=await userModel.findOne({email:currentUserEmail})
    //verify password
    if(!compare(currentPwd,currentUserDoc.password))
        return res.status(400).json({message:"Current password is not matched"})
    //hash new pwd
    let newHashedPwd=await hash(newPwd,12)
    //replace pwd
    currentUserDoc.password=newHashedPwd
    //save
    await currentUserDoc.save
    //send res
    res.status(200).json({message:"Password changed successfully"})
})