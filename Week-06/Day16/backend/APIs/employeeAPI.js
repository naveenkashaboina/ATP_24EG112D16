import exp from 'express';
import { EmployeeModel } from '../Models/EmployeeModel.js';


export const empApp = exp.Router()

//creating employee
empApp.post("/employee",async (req,res)=>{
  //get new employee object from req
  const newEmployee = req.body;
  //create new employee document 
  const newEmployeeDocument = new EmployeeModel(newEmployee)
  //save
  const result = await newEmployeeDocument.save()
  //send res 
  res.status(201).json({message: "employee created"});
})


//reading all employees
empApp.get('/employees',async (req,res)=>{
  //read all employees
  let employeeList = await EmployeeModel.find();
  //send res
  res.status(200).json({message:"employees",payLoad:employeeList})
})

//upadte the employee
empApp.put('/employee/:id',async(req,res)=>{
  //get employee by id
  const empID=req.params.id;
  const modifiedEmployee=req.body;
  //update employee
  const updatedEmployee = await EmployeeModel.findByIdAndUpdate(empID,{$set:{...modifiedEmployee}},{new:true})
  //if no employee found
  if(!updatedEmployee){
    res.status(400).json({message:"employee not found"})
  }
  //send res
  res.status(200).json({message:"employee Updated.",payLoad:updatedEmployee})
})

//delete employee 
empApp.delete('/employee/:id',async (req,res)=>{
  //get deleted id from re
  const deleteId=req.params.id;
  //find by id and delete
  const deletedEmployee=await EmployeeModel.findByIdAndDelete(deleteId);
  //send res
  res.status(200).json({message:"employee deleted.",payLoad:deletedEmployee});
})

