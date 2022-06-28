import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  addComment,
  createPost, 
  deleteComment, 
  deletePost, 
  fetchPostById, 
  fetchPosts, 
  likeComment, 
  likePost, 
  updatePost 
} from "../api";


const initialState = {
  posts: [],
  currentPost: null,
  status: 'idle',
  error: null
}

//ONLOAD DOES NOT UPDATE COMMENT LIKES

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetchPosts();
  return response.data;
})

export const getPostById = createAsyncThunk('posts/getPostById', async () => {
  const response = await fetchPostById();
  return response.data;
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
  const response = await createPost(newPost);
  return response.data;
})

export const updatedPost = createAsyncThunk('posts/updatedPost', async (post) => {
  const { _id } = post;
  try {
      const response = await updatePost(_id,post);
      return response.data;
  } catch (err) {
      console.log(err)     //return err.message;
      return post; // only for testing Redux!
  }
})

export const removePost = createAsyncThunk('posts/removePost', async (post) => {
  const { _id } = post;
  try {
      const response = await deletePost(_id);
      if (response?.status === 202) return post;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      console.log(err.message);
  }
})

export const toggleLikePost = createAsyncThunk('posts/toggleLikePost', async (_id) => {
  try {
    const response = await likePost(_id);
    return response.data;
  } catch (err) {
    console.log(err)     //return err.message;
    return _id; // only for testing Redux!
  }
})

export const createComment = createAsyncThunk('posts/addComment', async (data) => {
  const { postId, newComment } = data;
  try{
    const response = await addComment(postId,newComment);
    return response.data;
  } catch (err) {
    console.log(err);
    return newComment;
  }
})

export const removeComment = createAsyncThunk('posts/deleteComment', async (data) => {
  const { postId, commentId } = data;

  try{
    const response = await deleteComment(postId,commentId);
    return response.data;
  } catch (err) {
    console.log(err);
    return commentId;
  }
})

export const toggleLikeComment = createAsyncThunk('posts/toggleLikeComment', async (data) => {
  const { postId, commentId } = data;
  console.log('comment id: ',commentId);

  try{
    const response = await likeComment(postId,commentId);
    return response.data;
  } catch (err) {
    console.log(err);
    return commentId;
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.fulfilled,(state, action) =>{
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(getPostById.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        if (action.payload.message !== 'Unauthenticated!'){
          console.log(action.payload);
          state.posts.push(action.payload);
        }
      })
      .addCase(updatedPost.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const posts = state.posts.filter(post => post._id !== _id)
        state.posts = [...posts, action.payload];
        state.status = 'succeeded';
      })
      .addCase(removePost.fulfilled, (state,action)=>{
        if (!action.payload?._id){
          console.log('Delete could not complete');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const posts = state.posts.filter(post => post._id !== _id);
        state.posts = posts;
        state.status = 'succeeded'
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        if (!action.payload?._id) {
          console.log('Update could not complete');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const posts = state.posts.filter(post => post._id !== _id)
        state.posts = [...posts, action.payload];
        state.status = 'succeeded';
      })
      .addCase(createComment.fulfilled,(state,action) => {
        if (!action.payload?._id){
          console.log('Create comment could not complete');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const posts = state.posts.filter(post => post._id !== _id)
        state.posts = [...posts, action.payload];
        state.status = 'succeeded';
      })
      .addCase(removeComment.fulfilled, (state,action) => {
        if (!action.payload?._id){
          console.log('Delete comment could not complete');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        const index = state.posts.findIndex(post => post._id === _id);
        const newPosts = [...state.posts];
        newPosts[index] = action.payload;
      
        state.posts = newPosts;
        state.status = 'succeeded';
      })
      .addCase(toggleLikeComment.fulfilled, (state,action) => {
        if (!action.payload?._id){
          console.log('Like comment could not complete');
          console.log(action.payload);
          return;
        }
        const { _id } = action.payload;
        console.log(_id)
        const index = state.posts.findIndex(post => post._id === _id);
        console.log(index)
        const newPosts = [...state.posts];
        newPosts[index] = action.payload;

        console.log(newPosts[index])
        state.posts = newPosts;
        console.log(state.posts)
        state.status = 'succeeded';
      })     
  }
})

export const selectCurrentPost = (state) => state.posts.currentPost;
export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostsById = (state, postId) => {
  // console.log(postId)
  // console.log(state.posts.posts)
  return state.posts.posts.find(post => post._id === postId);
}

export default postsSlice.reducer;
