// CommonAPI.js

import exp from "express";
import { userModel } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
const { sign } = jwt;
export const commonApp = exp.Router();
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";
config();

//Route for register
commonApp.post("/users", upload.single("profileImageUrl"), async (req, res, next)  => {
  let cloudinaryResult;
  try {
    let allowedRoles = ["USER", "AUTHOR"];
    //get user from req
    const newUser = req.body;

    //check role
    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    //Upload image to cloudinary from memoryStorage
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }

    //add CDN link(secure_url) of image to newUserObj
    newUser.profileImageUrl = cloudinaryResult?.secure_url;

    //run validators manually
    //hash password and replace plain with hashed one
    newUser.password = await hash(newUser.password, 12);

    //create New user document
    const newUserDoc = new userModel(newUser);

    //save document
    await newUserDoc.save();
    //send res
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log("err is ", err);
    //delete image from cloudinary
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err);
  }
});

//Route for Login(USER, AUTHOR and ADMIN)
commonApp.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email" });
  if (!user.isUserActive) return res.status(403).json({ message: "You are blocked" });

  const isMatched = await compare(password, user.password);
  if (!isMatched) return res.status(400).json({ message: "Invalid password" });

  const signedToken = sign(
    { id: user._id, email, role: user.role, firstName: user.firstName,
      lastName: user.lastName, profileImageUrl: user.profileImageUrl },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  // REMOVE res.cookie — send token in body instead
  let userObj = user.toObject();
  delete userObj.password;
  res.status(200).json({ message: "login success", payload: userObj, token: signedToken });
});

// Logout — nothing to clear server-side anymore
commonApp.get("/logout", (req, res) => {
  res.status(200).json({ message: "Logout success" });
});

// check-auth — read token from Authorization header
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({ message: "authenticated", payload: req.user });
});

//Route for Logout
commonApp.get("/logout", (req, res) => {
  //delete token from cookie storage
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  //send res
  res.status(200).json({ message: "Logout success" });
});

//Page refresh
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({
    message: "authenticated",
    payload: req.user,
  });
});

//route to change password
commonApp.put("/password",verifyToken("USER","AUTHOR","ADMIN"),async(req,res)=>{

    const {currentPwd,newPwd }=req.body
    //check new pwd and current pwd are diff
    if(currentPwd===newPwd)
        return res.status(400).json({message:"new pwd must differ from current pwd"})
    //getting current user from req.cookies
    const currentUserEmail=req.user?.email
    const currentUserDoc=
    await userModel.findOne({email:currentUserEmail})
    //verify password
    const isMatched = await compare(currentPwd, currentUserDoc.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Current password is not matched" });
    }

    //hash new pwd
    let newHashedPwd=await hash(newPwd,12)
    //replace pwd
    currentUserDoc.password=newHashedPwd
    //save
    await currentUserDoc.save()
    //send res
    res.status(200).json({message:"Password changed successfully"})
})
