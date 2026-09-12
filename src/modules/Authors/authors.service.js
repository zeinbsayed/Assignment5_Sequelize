
import { db } from "../../DB/db.connection.js";



export const createAuthorsCollection = async (authorData) => {
const result= db.collection("authors").insertOne(authorData);
return result

};