import { Router } from "express";
import { addComment, findOrCreateComment, getSpecificComment, recentComments, searchComment, updateComment } from "./comments.service.js";
const commentRouter=Router(); 

///////////addPost///////////////////
commentRouter.post('/',async(req,res)=>
{
  
    const comments=  await addComment(req.body.comments);
     return res.status(201).json({message:"Comments created Successfully ",comments})
})

////////// Update the content of aspecific comment by its ID///////////////////////

commentRouter.patch('/comments/:commentId',async(req,res)=>
{
    const commentId=req.params.commentId;
    const comment=  await updateComment(commentId,req.body);
     return res.json({message:"Comment updated Successfully ",comment})
})


////////find a comment for aspecific post,user,and content/////////////////////
commentRouter.post('/comments/find-or-create',async(req,res)=>
{
    const comment=  await findOrCreateComment(req.body);
     return res.json({message:"Comment find or created Successfully ",comment})
})


/////////// Retrieve all comments that contain a specific word in their content////////
commentRouter.get('/comments/search',async(req,res)=>
{
    const comments=  await searchComment(req.query);
     return res.json({message:`Comments find ${req.query.word} Successfully `,comments})
})

//////////Retrieve the 3 most recent comments for a specific post////////////////////
commentRouter.get('/comments/newest/:postId',async(req,res)=>
{
    const {postId}=req.params;
    const comments=  await recentComments(postId);
     return res.json({message:` Recent Comments `,comments})
})

/////////////////////Get Specific Comment By PK with User and Post Information///////

commentRouter.get('/comments/details/:id',async(req,res)=>
{
    const {id}=req.params;
    const comment=  await getSpecificComment(id);
     return res.json({message:`  Comment Retrived `,comment})
})


export default commentRouter;