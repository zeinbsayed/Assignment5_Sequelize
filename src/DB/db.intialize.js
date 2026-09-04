

import { sequelize } from "./db.connection.js";
import "./associations.js";
export const intializeDB=async()=>
{
    try {
        
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Database connected and synchronized successfully");
        
        
    } catch (error) {
        console.log("Database Failed to connect ");
        
        
    }
  
}

