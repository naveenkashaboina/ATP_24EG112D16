//  UserAPI.js

import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { articleModel } from "../models/ArticleModel.js";
export const userApp = exp.Router();

//Read articles of all authors
userApp.get("/articles", async (req, res) => {
  //read artcles
  const articlesList = await articleModel.find({ isArticleActive: true });
  //send res
  res.status(200).json({ message: "artciles", payload: articlesList });
});

//Add comment to an article
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  //get body from req
  const { articleId, comment } = req.body;
  //check article
  const articleDocument = await articleModel
                          .findOne({ _id: articleId, isArticleActive: true })
                           .populate("comments.user");

  console.log(articleDocument);
  //if article nbot found
  if (!articleDocument) {
    return res.status(404).json({ message: "Article not found" });
  }
  //get user id
  const userId = req.user?.id;
  //add comment to comments array of articleDocument
  articleDocument.comments.push({ user: userId, comment: comment });
  // AFTER save, before sending res
await articleDocument.save();

// Re-fetch with populated comments
const populated = await articleModel
  .findById(articleId)
  .populate("comments.user", "email");

res.status(200).json({ message: "Comment added successfully", payload: populated });
});
