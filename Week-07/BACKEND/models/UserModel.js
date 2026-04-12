import { Schema , model } from "mongoose";

const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,'First name is required']
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,"EMail is required"],
        unique:[true,"EMail already exists"]
    },
    password:{
        type:String,
        required:[true,'Password is required']
    },
    role: {
    type: String,
    enum: {
        values: ["USER", "AUTHOR", "ADMIN"],
        message: "Role must be USER, AUTHOR, or ADMIN"
    },
    required: [true, "Role is required"]
    },
    profileImageURL:{
        type:String
    },isUserActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true,
    versionKey:false,
    strict:"throw"
})

//create model
export const userModel=model("user",userSchema)