import mongoose from "mongoose";

const postSchema = mongoose.Schema({
   title: String,
   message: String,
   creator: String,
   creatorProfile: String,
   tags: [String],
   selectedFile: String,
   likes: {
      type: [String],
      default: []
   },
   comments:{
      type: [
         {
            creator: String,
            creatorProfile: String,
            datePosted: {
               type: Date,
               default: new Date()
            },
            message: String,
            likes: {
               type: [String],
               default: []
            },
         }
      ],
      default: []
   },
   datePosted: {
      type: Date,
      default: new Date()
   }
})

const PostMessage = mongoose.model('PostMessage', postSchema);
export {PostMessage} ;