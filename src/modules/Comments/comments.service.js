import { Op } from "sequelize";
import { Comments } from "../../DB/Models/comments.model.js";
import { Posts } from "../../DB/Models/posts.model.js";
import { usersModel } from "../../DB/Models/users.model.js";

////////////////////////add post////////////////////////
export const addComment=async(inputs)=>{
 //   const {content,postId,userId}=inputs;
 
    for (const comment of inputs) {

        const post = await Posts.findByPk(comment.postId);

        if (!post) {
            throw new Error(`Post with id ${comment.postId} not found`,{cause:{status:404}});
        }
    }
     const comments = await Comments.bulkCreate(inputs);

    return comments;
}
////////////update comment/////////////////////////////////
export const updateComment=async(commentId,inputs)=>{
    const {userId,content}=inputs;
    const comment = await Comments.findByPk(commentId);
     if (!comment) {
            throw new Error(`Comment not found`,{cause:{status:404}});
        }
         if (comment.userId !== userId) {
        throw new Error("You are not authorized to update this comment", { cause: { status: 403 }});

              }


    comment.content = content;

    await comment.save();

    return comment;
}



//////////////////////find a comment for aspecific post,user,and content/////////////
export const findOrCreateComment = async (inputs) => {
    const { postId, userId, content } = inputs;

    const [comment, created] = await Comments.findOrCreate({
        where: {
            postId,
            userId,
            content
        },
        defaults: {
            postId,
            userId,
            content
        }
    });

    return { comment, created };
};


/////////// Retrieve all comments that contain a specific word in their content////////

export const searchComment=async(inputs)=>{
    const {word}=inputs;
    const comments = await Comments.findAndCountAll({where:{
        content:{
            [Op.like]: `%${word}%`
        }
    }});
    if(comments.rows.length==0)
    {
    throw new Error(` No Comments found`,{cause:{status:404}});

    }
     
    return comments;
}


//////////Retrieve the 3 most recent comments for a specific post////////////////////

export const recentComments=async(postId)=>{
const comments = await Comments.findAll({
        where: {
            postId
        },
        order: [["createdAt", "DESC"]],
        limit: 3
    });
if(comments.length==0)
{
    throw new Error(` No Comments found for this post`,{cause:{status:404}});

}
    return comments;
}
////////////////////////Get Specific Comment By PK with User and Post Information///////


export const getSpecificComment=async(id)=>{
      const comment = await Comments.findByPk(id,{
    attributes: ["id", "content"],
    include: [
        {
            model:usersModel,
            attributes: ["id", "name","email"]
        },
        {
            model: Posts,
            attributes: ["id","title", "content"]
        }
    ]
});
if(!comment)
{
    throw new Error(` No Comment found`,{cause:{status:404}});

}
 
    return comment;
}