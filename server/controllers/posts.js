import mongoose from "mongoose";
import { PostMessage } from "../models/postMessage.js";


export const getPosts = async (req,res)=>{
   try{
      const postMessages = await PostMessage.find()
      
      res.status(200).json(postMessages)
   }catch(error){
      res.status(404).json({message: error.message });
   }
}

export const createPost = async (req,res)=>{
   if (!req.userId) return res.json({ message: 'Unauthenticated!'});
   
   const post = req.body;

   const newPost = new PostMessage(post);

   console.log(req)

   try{
      await newPost.save();
      res.status(201).json(newPost);
   } catch (error){
      res.status(400).json({message: error.message});
   }
}

export const getPostByCreator = async (req,res) =>{
   const creator = req.body.creator;

   try{
      const postMessage = await PostMessage.find({creator:creator})
      res.status(200).json(postMessage)
   }catch(error){
      res.status(404).json({message:error.message})
   }
}

export const getPostById = async (req,res) =>{
   const { id } = req.params;

   try{
      const postMessage = await PostMessage.findById(id);
      res.status(200).json(postMessage)
   }catch(error){
      res.status(404).json({message:error.message})
   }
}

export const updatePost = async (req, res) => {
   const { id } = req.params;
   const { title, message, creator, tags } = req.body;

   if (!req.userId) return res.json({ message: 'Unauthenticated!'});

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id ${id}`});

   const updatedPost =  { title, message, creator, tags, _id:id }

   await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true});
   const post = await PostMessage.findById(id);
   res.json(post);
}

export const deletePost = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id ${id}`});

   await PostMessage.findByIdAndRemove(id);

   res.status(202).json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
   const { id } = req.params;

   if (!req.userId) return res.json({ message: 'Unauthenticated!'});

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id ${id}`});

   let post = await PostMessage.findById(id);

   const index = post.likes.findIndex((id) => id === String(req.userId));

   if (index === -1){
      post.likes.push(req.userId)
   } else {
      post.likes = post.likes.filter((id)=> id !== String(req.userId))
   }

   const updatedPost = await PostMessage.findByIdAndUpdate(id, post,{ new: true });

   res.status(200).json(updatedPost);
}

export const commentPost = async (req,res) => {
   const { id } = req.params;
   const { creator, message, creatorProfile }  = req.body;

   if (!req.userId) return res.json({ message: 'Unauthenticated!'});

   const post = await PostMessage.findById(id);

   post.comments.push({ creator: creator, message: message, creatorProfile: creatorProfile });

   await PostMessage.findByIdAndUpdate(id, post, { new: true });
   
   res.json(post);
}

export const deleteComment = async (req, res) => {
   const { id } = req.params;
   const { commentId } = req.body;

   if (!req.userId) return res.json({ message: 'Unauthenticated!'});

   try{
      await PostMessage.findByIdAndUpdate(id, {
         '$pull': {
            'comments':{'_id': new mongoose.Types.ObjectId(commentId)}
         }
      });

      const post = await PostMessage.findById(id);
   
      res.json(post);
   } catch(error){
      res.status(404).json({ message: error.message })
   }
}

export const likeComment = async (req, res) => {
   const { id } = req.params; //postid
   const { commentId } = req.body; //comment id

   if (!req.userId) return res.json({ message: 'Unauthenticated!'});

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id ${id}`});

   try{
      const post = await PostMessage.findById(id);
      const commentIndex = post.comments.findIndex((comment) => String(comment._id) === commentId);
   
      if (commentIndex !== -1){
         const likeIndex = post.comments[commentIndex].likes.findIndex((id) => id === String(req.userId));
   
         if (likeIndex === -1){
            //console.log(commentIndex,'push')
            post.comments[commentIndex].likes.push(req.userId);
         }
         else{
            //console.log(commentIndex,'159 filter')
            post.comments[commentIndex].likes = post.comments[commentIndex].likes.filter((id)=> id !== String(req.userId))
            //console.log(post.comments[commentIndex],'161');
         }
      }
   
      const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
      //console.log(updatedPost)
      res.json(updatedPost);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
}