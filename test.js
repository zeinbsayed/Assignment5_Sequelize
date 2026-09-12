import mongoose from "mongoose";


const url="mongodb+srv://zeinbmohammed_db_user:7vJbbPq0xuGiBBUm@cluster0.bwxuyzb.mongodb.net/"

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:");
    console.log(error);
  });