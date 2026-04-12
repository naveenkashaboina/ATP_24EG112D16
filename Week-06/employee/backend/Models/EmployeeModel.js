import { Schema,model } from "mongoose";
const EmployeeSchema= Schema({
 name:{
  type:String,
  required:[true,"name is required"]
 },
 email:{
  type:String,
  required:[true,"email is required"],
  unique:true
 },
 mobile:{
  type:Number,
  required:[true,"mobileno is required"],
  minLength:10,
  maxLength:10
 },
 designation:{
  type:String,
  required:[true,"designation is required"]
 },
 companyName:{
 type:String,
 required:[true,"company name is required"],
 minLength:4
 }

}
);
export const EmployeeModel = new  model("Employee",EmployeeSchema);