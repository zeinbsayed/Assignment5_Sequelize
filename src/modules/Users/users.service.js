import { where } from "sequelize";
import { usersModel } from "../../DB/Models/users.model.js"
/////////////////////////sign up////////////////////////
export const signup=async(inputs)=>{
    const {name,email,password,role}=inputs;
    const emailExists=await usersModel.findOne({where:{email}})
    if(emailExists)
    {
        throw new Error("Email already exists",{cause:{status:409}});
    }
    const user = usersModel.build({ name,email,password});
    await user.save();
    return user;
}


//////////////////////create or update and skip validation option////////////
export const createOrUpdate=async(id,inputs)=>{
    const user_found=await usersModel.findOne({where:{id}});
      const {name,email,password,role}=inputs;
    if(user_found)
    {
      await usersModel.update({name,email,password,role},{where:{id}},{validate:false})
      const user=await usersModel.findOne({where:{id}});
      return user;
    }
    
    await usersModel.create({ name,email,password},{validate:false});
    
      const user=await usersModel.findOne({where:{id}});
    
  
    
    
    
    return user;
}

//////////////////////find a user by their email address////////////
export const getByEmail=async(email)=>{
    const user_found=await usersModel.findOne({where:{email},attributes:{exclude:["deletedAt"]}});
    if(!user_found)
    {
       throw new Error("No user found",{cause:{status:404}});
    }
  
    
    
    return user_found;
}


//////////////////////find a user by id////////////
export const getByID=async(id)=>{
    const user_found=await usersModel.findOne({where:{id},attributes:{exclude:["role"]}});
    if(!user_found)
    {
       throw new Error("User not found",{cause:{status:404}});
    }
  
    
    
    return user_found;
}