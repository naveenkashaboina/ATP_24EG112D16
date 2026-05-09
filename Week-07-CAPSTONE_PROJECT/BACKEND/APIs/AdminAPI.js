// AdminAPI.js

import exp from 'express'
export const adminApp=exp.Router()
import { verifyToken } from '../middlewares/VerifyToken.js'
import { articleModel } from '../models/ArticleModel.js'
import { userModel } from '../models/UserModel.js'

// read all atricle of all authors even in-active
adminApp.get("/articles",verifyToken("ADMIN"),async(req,res)=>{
    //read articles
    const articlesList=await articleModel.find().populate("author", "email firstName lastName")
    //send res
    return res.status(200).json({message:"Articles list is :",payload:articlesList})
})

// change state of user or author active-inActive
adminApp.put("/state", verifyToken("ADMIN"), async (req, res) => {
  let { mail, toBeActive } = req.body;

  // Convert string to boolean
  toBeActive = toBeActive === "true";

  const userDoc = await userModel.findOne({ email: mail });
  if (!userDoc)
    return res.status(404).json({ message: "User not found" });

  if (userDoc.isUserActive === toBeActive)
    return res.status(200).json({ message: "User is already in same state" });

  userDoc.isUserActive = toBeActive;
  await userDoc.save();
  return res.status(200).json({ message: "User state updated" });
});


// Route for Admin to read all users & authors (emails only)
adminApp.get("/users-authors", verifyToken("ADMIN"), async (req, res) => {
  try {

    const usersAndAuthors = await userModel.find(
      { role: { $in: ["USER", "AUTHOR"] } },
      { email: 1, role: 1, isUserActive: 1 }
    );

    res.status(200).json({
      message: "Users and Authors emails",
      payload: usersAndAuthors,
    });

  } catch (err) {
    console.error("Error fetching users/authors:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});
