import { 
  Avatar,
  Container, 
  Divider, 
  Grid, 
  Heading,
  VStack, 
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PostList } from '../components';
import { getUserbyUsername, selectSearchedUser, selectUser } from '../features/authSlice';
import { getPostsError, getPostsStatus, selectAllPosts } from '../features/postsSlice';

//Add user visit page
const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const searchedUser = useSelector(selectSearchedUser);
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const isUser = user?.username === searchedUser?.username

  useEffect(() => {
    dispatch(getUserbyUsername(username));
  }, [user,searchedUser]);

  return (
    <Container maxW={{base:'95%', md:'90%'}} textAlign={'center'}>
      {/* {(isVisiting === true && username !== null) ? (
        <Heading>{username} Profile</Heading>
      ): (
        <Heading>My Profile</Heading>
      )} */}
      <Heading>{isUser ? 'My Profile' : `User's Profile`}</Heading>
      <Heading mb={'0.5em'}  _light={{color:'blue.700'}} _dark={{color:'teal.300'}}>{isUser ? user?.username : searchedUser?.username}</Heading>
      <VStack spacing={'1em'} mb={'2em'}>
        <Avatar src={user?.profilePicture} width={'200px'} height={'200px'}/>
        <Heading fontSize={'md'}>User since: {isUser ? format(new Date(user?.dateCreated || '01/01/01'),'dd/MM/yyyy') : format(new Date(searchedUser?.dateCreated  || '01/01/01'),'dd/MM/yyyy')}</Heading>
      </VStack>
      <Heading mb={'0.25em'} textAlign={'start'}>{isUser ? 'My Posts' : `User's Post`}</Heading>
      <Divider mb={'1em'}/>
      <Grid templateColumns='repeat(4, 1fr)' gap={5}>
        <PostList user={isUser ? user?.username : searchedUser?.username} posts={posts} postStatus={postStatus} error={error}/>
      </Grid>
    </Container>
  )
}

export default Profile