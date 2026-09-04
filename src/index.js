import express from "express";
import { commentRouter, postRouter, userRouter } from "./modules/index.js";
import { port } from "../Config/config.js";
import { intializeDB } from "./DB/db.intialize.js";
const app=express();

//app.listen(port,()=>{console.log("Server Running on port",port)});
//connect to DB//////////
const startServer = async () => {
    try {
        await intializeDB();

        app.listen(3000, () => {
            console.log(`Server Running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

//run server/////////
startServer();
//intializeDB();
//parsing body
app.use(express.json());

/////////////Routers and Controllers  ///////////
app.use('/users',userRouter)
app.use('/posts',postRouter)
app.use('/comments',commentRouter);


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
