import { Box, Button, Container, Heading, Image, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { selectPostsById, updatedPost } from '../features/postsSlice';
import { Form } from '../components';
import { selectUser } from '../features/authSlice';

const EditPost = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const post = useSelector((state) => selectPostsById(state,id));
  
  const [postData, setPostData] = useState({
    _id: post?._id,
    creator: user?.username,
    creatorProfile: post?.creatorProfile,
    title: post?.title,
    message: post?.message,
    tags: post?.tags,
    likes: post?.likes,
    comments: post?.comments,
    selectedFile: post?.selectedFile,
    datePosted: post?.datePosted
  });

  if (!post) {
    return <Heading _light={{color:'blue.700'}} _dark={{color:'teal.300'}}> Post Not Found !😭</Heading>
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updatedPost(postData));
    toast({
      title: 'Post updated!',
      status: 'success',
      isClosable: true,
    })
    navigate('/');
  }

  return (
    <div>
      <Container maxW={{base:'95%', md:'55%'}} display={'flex'} flexDir={'column'} justifyContent={'start'}>
        <Heading textAlign={'center'}>Edit Post</Heading>
        <Heading fontSize={'2xl'} fontWeight={'medium'} mb={'1em'} textAlign={'center'}>By {post.creator}</Heading>
        <Image display={'flex'} flexDir={'row'} alignSelf={'center'} src={post.selectedFile} width={'400px'} borderRadius={'2xl'} />
        <Form formData={postData} setFormData={setPostData} type={'updatepost'} onSubmit={handleUpdate} btnName={'Update'}/>
        <Box display={{base:'flex', md:'none'}} flexDir={'row'} justifyContent={'center'} mt={'1em'}>
          <Button colorScheme={'blue'} as={Link} to={'/'}>Back to Home</Button>
        </Box>
      </Container>
    </div>
  )
}

export default EditPost