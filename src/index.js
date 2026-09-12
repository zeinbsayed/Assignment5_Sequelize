import express from "express";
import { dbConnection } from "./DB/db.connection.js";
import { port } from "../Config/config.js";
import { authorRouter, bookRouter } from "./modules/index.js";
import logsRouter from "./modules/Logs/logs.controller.js";
const app=express();
//const port=3000;
//connect to DB//////////
const startServer = async () => {
    try {
        await dbConnection();

        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

//run server/////////
startServer();
//parsing body
app.use(express.json());

/////////////Routers and Controllers  ///////////
app.use('/books',bookRouter)
app.use('/authors',authorRouter)
app.use('/logs',logsRouter)


//Sample endPoint //////landing page
app.get('/',(req,res)=>res.send("Hello,This is a sample endpoint "));










//NOT Found Route
app.use((req,res)=>
{
    res.status(404).json({message:"Invalid Route"});
})
//Error Handling MiddleWare
app.use((error,req,res,next)=>
{
  const status=error?.cause?.status||500;
  return res.status(status).json({
    error,
    message:error.message||"Something went wrong",
    stack:error.stack
  })
})


/**
 * 

startServer();
 */
