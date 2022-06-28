import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, getPostsStatus, removeComment, selectPostsById, toggleLikeComment } from '../features/postsSlice';
import { Comment } from '../components';
import Form from '../components/Form';
import { selectUser } from '../features/authSlice';

const PostDetails = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectPostsById(state,id));
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const postStatus = useSelector(getPostsStatus);
  const [commentData, setCommentData] = useState({
    creator: user?.username,
    message: '',
    likes: [],
    datePosted: undefined
  })

  if (!post) {
    return <Heading _light={{color:'blue.700'}} _dark={{color:'teal.300'}}> Post Not Found !😭</Heading>
  }

  const handleDeleteComment = (commentId) => {
    let postId = post._id;
    dispatch(removeComment({postId,commentId}));
    toast({
      title: 'Comment deleted!',
      status: 'success',
      isClosable: true,
    })
  }

  const handleLikeComment = (commentId) => {
    if (!user) navigate('/sign-in')
    let postId = post._id;
    dispatch(toggleLikeComment({postId,commentId}));
  }

  let content;
  
  if (postStatus === 'loading') {
      content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
      const orderedComments = post.comments.slice().sort((a, b) => b.datePosted.localeCompare(a.datePosted));
      content = orderedComments.map((comment) => {
      return (
        <Comment 
          datePosted={comment.datePosted} 
          message={comment.message} 
          creator={comment.creator}
          profilePicture={comment.creatorProfile}
          handleDeleteComment={handleDeleteComment} 
          id={comment._id}
          likes={comment.likes}
          handleLikeComment={handleLikeComment}
          key={comment._id}/>
      )})
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) navigate('/sign-in');
    let newComment = {
      creator: user.username,
      creatorProfile: user.profilePicture,
      message: commentData.message,
      likes: [],
      datePosted: undefined
    }
    setCommentData(()=>({
      creator: user?.username,
      message: '',
      likes: [],
      datePosted: undefined
    }));
    console.log(newComment);
    let postId = post._id;
    dispatch(createComment({postId,newComment}));

  }

  return (
    <Container maxW={{base:'95%', md:'80%'}} mb={'2em'}>
      <Heading _light={{color:'blue.700'}} _dark={{color:'teal.300'}} textAlign={'center'}>{post.title}</Heading>
      <Heading fontSize={{base: 'lg', md: '2xl'}} textAlign={'center'}>By {post.creator}</Heading>
     <Grid templateColumns={'repeat(12,1fr)'} mt={'2em'}>
     <GridItem colSpan={{base:12, md:6}}  display={'flex'} justifyContent={'center'}>
      <Image src={post.selectedFile} shadow={'lg'} borderRadius={'2xl'} width={'90%'} objectFit={'cover'} maxW={'450px'} maxH={'450px'}/>
     </GridItem>
      <GridItem colSpan={{base:12, md:6}}>
        <VStack alignItems={'start'}>
          <HStack display={{base: 'none', md:'flex'}}>
            {post.tags.map((tag,i) => (
              <Badge colorScheme={'blue'} textTransform={'revert'} fontSize={'lg'} key={i}>#{tag}</Badge>
            ))}
          </HStack>
          <Box display={{base: 'flex',md: 'none'}}>
            <Grid templateColumns={'repeat(2,1fr)'} mt={{base:'1em',md:0 }} gap={2}>
              {post.tags.map((tag,i) => (
                <GridItem colSpan={1} key={i}>
                  <Badge colorScheme={'blue'} textTransform={'revert'} fontSize={'sm'}>#{tag}</Badge>
                </GridItem>
              ))}
            </Grid>
          </Box>
          <Heading fontSize={'lg'} fontWeight={'bold'}>Description</Heading>
          <Text>{post.message}</Text>
        </VStack>
        <Heading fontSize={'lg'} fontWeight={'bold'} mt={'1em'}>Post a comment:</Heading>
        <Form formData={commentData} setFormData={setCommentData} type={'comment'} onSubmit={handleAddComment} btnName={'Post'}/>
        <Heading fontSize={'lg'} fontWeight={'bold'}>{post.comments.length === 0 ? undefined : 'Comments'}</Heading>
        <VStack spacing={'1em'} mt={'1em'} alignItems={'start'}> 
          {content}
        </VStack>
        <Box display={{base:'flex', md:'none'}} flexDir={'row'} justifyContent={'center'} mt={'1em'}>
          <Button colorScheme={'blue'} as={Link} to={'/'}>Back to Home</Button>
        </Box>
      </GridItem>
      </Grid>
    </Container>
  )
}

export default PostDetails