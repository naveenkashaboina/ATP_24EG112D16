import { Schema,model,Types } from "mongoose"

const commentSchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"user Id is required"]
    },
    comment:{
        type:String,
        required:[true,"empty comment isnt allowed"]
    }
})
const articleSchema= new Schema({
    author:{
        type:Types.ObjectId,
        ref:"user",
        required:[true,"Author in development"]
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    category:{
        type:String
    },
    isArticleActive:{
        type:Boolean,
        default:true
    },
    content:{
            type:String
        },
    comments:[{type:commentSchema,default:[]}]
    },{versionKey:false,
    timestamps:true,
    strict:"throw"
})

// export Article model
export const articleModel=model("article",articleSchema)