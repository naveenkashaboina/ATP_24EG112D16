import exp from 'express'
export const userApp=exp.Router()
import {articleModel} from '../models/ArticleModel.js'
import { verifyToken } from '../middleWares/VerifyToken.js'


//read articles of all authors
userApp.get("/articles",verifyToken("USER"),async(req,res)=>{
    //read article which are active
    const articlesList=await articleModel.find({isArticleActive:true})
    //send res
    res.status(200).json({message:"Articles",payload:articlesList})
})

//add comment
userApp.put("/articles",verifyToken("USER"),async (req,res)=>{
    // get body from req
    const { articleId,comment }=req.body
    // check article
    const articleDoc=await articleModel.findOne({_id:articleId,isArticleActive:true})
    if(!articleDoc)
        return res.status(404).json({message:"article not found"})
    //get user id
    const userId = req.user._id;
    //add comment to articleDoc
    articleDoc.comments.push({user:userId,comment:comment})
    await articleDoc.save()
    //send res
    res.status(200).json({message:"Coment added successfully"})
})