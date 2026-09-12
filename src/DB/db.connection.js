import { MongoClient } from "mongodb";
import dns from "node:dns"
import { DB_NAME, URI } from "../../Config/config.js";
const client=new MongoClient(URI);
dns.setServers(["1.1.1.1"]);
export const dbConnection=async()=>
{
  try {
    await client.connect();
    console.log("Connected To MongoDB Successfully");
    
    
  } catch (error) {

        console.log("Failed to Connect To MongoDB ",error);

  }
}
 export const db=client.db(DB_NAME);