import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()
const {verify} = jwt

export const verifyToken=(...allowedRoles)=>{
return (req,res,next)=>{
    try{
        // get roken from cookie
        const token=req.cookies?.token
        //check token existence
        if(!token){
            return res.status(401).json({message:"please login 1st"})
        }
        //validate token(decode the token)
        let decodedToken=verify(token,process.env.SECRET_KEY);
        //check the roles is same as role decoded token
    if(!allowedRoles.includes(decodedToken.role)){
        return res.status(403).json({message:"you are not authroized"})
    }
        //add decoded token
        console.log("token Verified")
        req.user=decodedToken
        next()
    }catch(err){
        console.error("Token verification error:", err);
        return res.status(401).json({message:"Invalid token"})
    }
}
}