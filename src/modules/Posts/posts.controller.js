import { Router } from "express";
import { addPost, deletePost, getAllPosts, getPostsCountComment } from "./posts.service.js";
const postRouter=Router();
///////////addPost///////////////////
postRouter.post('/',async(req,res)=>
{
  
    const result=  await addPost(req.body);
     return res.status(201).json({message:"Post added Successfully ",result})
})


///////////deletePost///////////////////
postRouter.delete('/:postId',async(req,res)=>
{
    const {postId}=req.params;
    const {userId}=req.body;
    const result=  await deletePost(postId,userId);
     return res.status(201).json({message:"Post deleted Successfully ",result})
})

///////////Retrive all posts of users and their comments///////////////////
postRouter.get('/details',async(req,res)=>
{
    const posts=await getAllPosts();
      return res.status(200).json({ message: "Posts retrieved successfully",posts });
   
})
/////////////  Retrieve all  posts and count the number of comments///////////////////////
postRouter.get('/posts/comment-count',async(req,res)=>
{
    const posts=await getPostsCountComment();
      return res.status(200).json({ message: "Posts retrieved successfully",posts });
   
})

export default postRouter;
