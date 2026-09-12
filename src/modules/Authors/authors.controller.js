import { Router } from "express";
import { createAuthorsCollection } from "./authors.service.js";
const authorRouter=Router();
authorRouter.post("/collection/authors",async (req, res) => {
  try {
     const result=await createAuthorsCollection(req.body);

     return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });;

  } catch (error) {
   return res.status(500).json({  message: error.message })
}
})
export default authorRouter;