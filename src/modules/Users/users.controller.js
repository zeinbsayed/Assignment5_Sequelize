import { Router } from "express";
import { createOrUpdate, getByEmail, getByID, signup } from "./users.service.js";
const userRouter=Router();
////////////////signup////////////////////////////////////////////
userRouter.post('/signup',async(req,res)=>
{
  
    //call service function
  const result=  await signup(req.body);
 return res.status(201).json({message:"User added Successfully ",result});
})

////////////create or update ////////////////////////////////////////
userRouter.put('/user/:id',async(req,res)=>
{
  const id=req.params.id;
  const result=await createOrUpdate(id,req.body);
  return res.status(201).json({message:"User is created or updated successfully",result})

})
////////////get by email ////////////////////////////////////////
userRouter.get('/user/by-email',async(req,res)=>
{
  
  const {email}=req.query;
  
  const result=await getByEmail(email);
  return res.json({message:"User found successfully",result})

})

////////////get by id ////////////////////////////////////////
userRouter.get('/user/:id',async(req,res)=>
{
  
  const {id}=req.params;
  
  const result=await getByID(id);
  return res.json({message:"User found successfully",result})

})

export default userRouter;