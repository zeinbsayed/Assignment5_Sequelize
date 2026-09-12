import { Router } from "express";
import { addLog, createLogsCollection } from "./logs.service.js";
const logsRouter=Router();


////create logs collection/////////////////////////
logsRouter.post("/collection/logs/capped",async (req, res) => {
  try {
     await createLogsCollection();

    return res.status(201).json( {"OK":1});

  } catch (error) {
   return res.status(500).json({  message: error.message })
}
})


///////create anew  log /////////////////////////
logsRouter.post("/",async (req, res) => {
  try {
    const result= await addLog(req.body);

   return res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });;
    
  } catch (error) {
   return res.status(500).json({  message: error.message })
}
})
export default logsRouter;