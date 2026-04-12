import exp from 'express'
import { verifyToken } from '../middleWares/VerifyToken.js'
import { userModel } from '../models/UserModel.js'
import { articleModel } from '../models/ArticleModel.js'
export const authorApp=exp.Router()


//Write Article                             
authorApp.post("/articles", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const articleObj = req.body;
    const user = req.user;

    // find author by ID from token
    const author = await userModel.findById(user.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    if (author.email !== user.email) return res.status(403).json({ message: "One can publish their own articles only" });
    if (author.role !== "AUTHOR") return res.status(403).json({ message: "Only authors can publish" });

    // auto-assign author field using ObjectId
    articleObj.author = author._id;

    const articleDoc = new articleModel(articleObj);
    await articleDoc.save();

    res.status(201).json({ message: "Article published successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

//Read own article
authorApp.get("/articles",verifyToken("AUTHOR"),async (req,res)=>{
    //read article by author email
    const authorIdOfToken=req.user?.id;
    //get articles by author id
    const articleList=await articleModel.find({author:authorIdOfToken}) 
    //send res
    res.status(200).json({message:"Article",payload:articleList})
})


//edit articles
authorApp.put("/articles",verifyToken("AUTHOR"),async (req,res)=>{
    //get article from body
    let {articleId,title,category,content}=req.body
    //get authorid from decoded token
    let authorIdOfToken=req.user?.id
    //get modified article from client
    const modifiedArticle=await articleModel.findOneAndUpdate(
        {_id:articleId,author:authorIdOfToken},
        {$set:{title,category,content}},
        {new:true}
    )
    //if either article id or author not correct
    if(!modifiedArticle){
        return res.status(403).json({message:"not authorised to edit article"})
    } 
    //send res
    res.status(200).json({message:"Article modified",payload:modifiedArticle})
})

//delete articles
authorApp.patch("/articles",verifyToken("AUTHOR"),async (req,res)=>{
    //get author id from decoded token
    const authorIdOfToken=req.user?.id;
    if(!authorIdOfToken)
        return res.status(401).json({message:"Login 1st"})
    //deStructure the id and state
    let { articleId,isArticleActive } = req.body
    //get article
    const articleDoc= await articleModel.findById(articleId)
    if(!articleDoc)
        return res.status(404).json({message:"article not found"})
    // ensure the logged-in author owns this article
    if (articleDoc.author.toString() !== authorIdOfToken) {
      return res.status(403).json({ message: "You can only update your own articles" });
    }

    articleDoc.isActive=isArticleActive
    await articleDoc.save();
    // send res
    return res.status(200).json({message:"Article is DeActivated/Activated"})
    
})