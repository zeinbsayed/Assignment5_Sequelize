
import { db } from "../../DB/db.connection.js";

////create Logs Collection/////////////

export const createLogsCollection = async () => {
const result= db.createCollection("logs", {
  capped: true,
  size: 1048576
})
return result

};
///// Insert a new log into the logs collection////////////////
export const  addLog=async(logData)=>
{
 return db.collection("logs").insertOne(logData);


}

