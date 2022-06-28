import express from 'express';
import { 
   getPosts,
   createPost,
   getPostByCreator,
   getPostById,
   updatePost,
   deletePost,
   likePost,
   commentPost,
   deleteComment,
   likeComment
} from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',getPosts);
router.post('/',auth,createPost);
router.get('/:id',getPostById);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likepost',auth, likePost);
router.post('/:id/addcomment',auth, commentPost);
router.post('/:id/deletecomment',auth, deleteComment);
router.patch('/:id/likecomment',auth, likeComment);

export default router;