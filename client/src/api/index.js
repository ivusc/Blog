import axios from "axios";

const BASE_URL = 'http://localhost:5000';

const API = axios.create({baseURL: BASE_URL});

export const fetchPosts = () => API.get('/posts');
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post('/posts', newPost,{ withCredentials: true });
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost,{ withCredentials: true });
export const deletePost = (id) => API.delete(`/posts/${id}`,{ withCredentials: true });
export const likePost = (id) => API.patch(`/posts/${id}/likepost`,undefined, { withCredentials: true });

export const addComment = (id, comment) => API.post(`/posts/${id}/addcomment`,comment, { withCredentials: true });
export const deleteComment = (id, commentId) => API.post(`/posts/${id}/deletecomment`,{ commentId }, { withCredentials: true });
export const likeComment = (id, commentId) => API.patch(`/posts/${id}/likecomment`,{ commentId }, { withCredentials: true });

export const signIn = (user) => API.post('/user/signin',user, { withCredentials: true });
export const signUp = (user) => API.post('/user/signup',user, { withCredentials: true });
export const signOut = () => API.delete('/user/signout', { withCredentials: true });
export const fetchUser = () => API.get('/user/getuser', { withCredentials: true });
export const fetchUserByUsername = (username) => API.get(`/user/getuserbyusername/${username}`);

export const uploadImage = (formData) => axios.post("https://api.imgbb.com/1/upload?key=ddae448e0d40e4160854e5c10a0b6583",formData)