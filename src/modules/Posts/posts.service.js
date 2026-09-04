import { col, fn } from "sequelize";
import { Posts } from "../../DB/Models/posts.model.js";
import { usersModel } from "../../DB/Models/users.model.js";
import { Comments } from "../../DB/Models/comments.model.js";

////////////////////////add post////////////////////////
export const addPost=async(inputs)=>{
    const {title,content,userId}=inputs;
    const post = Posts.build({title,content,userId});
    await post.save();
    return post;
}

////////////////////////delete post////////////////////////
export const deletePost=async(id,userId)=>{
    const post=await Posts.findOne({where:{id}});
    if(!post)
    {
        throw new Error("Post not found",{cause:{status:404}});
    }
    const post_userId=post.userId;
    if(post_userId!=userId)
    {
        throw new Error("You are not authorized to delete this post..",{cause:{status:409}})
    }
    await Posts.destroy({where:{id}})
 
    return post;
}

///////////Retrive all posts of users and their comments///////////////////
export const getAllPosts=async()=>{
      const posts = await Posts.findAll({
    attributes: ["id", "title"],
    include: [
        {
            model:usersModel,
            attributes: ["id", "name"]
        },
        {
            model: Comments,
            attributes: ["id", "content"]
        }
    ]
});
 
    return posts;
}
//////////////////////
/////////////  Retrieve all  posts and count the number of comments///////////////////////
export const getPostsCountComment=async()=>{
      const posts = await Posts.findAll({
    attributes: ["id", "title",  [fn("COUNT", col("Comments.id")), "commentsCount"]],
    include: [
        {
            model: Comments,
            attributes: []
        }
    ],
    group: ["Posts.id"]
});
 
    return posts;
}
