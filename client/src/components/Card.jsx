import React from 'react';
import {
   Box,
   Heading,
   Text,
   Stack,
   Avatar,
   useColorModeValue,
   Image,
   IconButton,
   StatNumber,
   Stat,
   useToast,
   Flex,
   useDisclosure,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
} from '@chakra-ui/react';
import { FaTrash, FaThumbsUp, FaInfoCircle, FaArrowAltCircleUp, FaRegThumbsUp } from "react-icons/fa";
import { BsThreeDots, BsChatRightTextFill } from 'react-icons/bs';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removePost, toggleLikePost } from '../features/postsSlice';
import { selectUser } from '../features/authSlice';


const Card = ({post}) => {
  const { onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const user = useSelector(selectUser);

  const handleDelete = () => {
    dispatch(removePost(post));
    toast({
      title: 'Post Deleted!',
      status: 'success',
      isClosable: true,
    })
  }

  const handleLike = () => {
    if (!user) navigate('/sign-in');
    dispatch(toggleLikePost(post._id));
  }

   return (
     <>
       <Box
         maxW={'445px'}
         maxH={'62.5em'}
         h={'full'}
         w={'full'}
         bg={useColorModeValue('white', 'gray.900')}
         boxShadow={'2xl'}
         rounded={'xl'}
         overflow={'hidden'}>
         <Flex direction={'row'} align={'end'} textAlign={'left'} p={3}>
           <Avatar
             src={post.creatorProfile}
             mr={2}
           />
           <Stack mr={'10em'} direction={'column'} spacing={0} fontSize={'sm'} >
             <Text fontWeight={600} 
              as={Link} 
              to={`/profile/${post.creator}`}
              _hover={{
                textDecoration:'underline'
              }}
              >{post.creator}</Text>
             <Text color={'gray.500'}>{format(new Date(post.datePosted),'dd/MM/yyyy')}</Text>
           </Stack>
           <Menu>
            <MenuButton as={IconButton} icon={<BsThreeDots />} aria-label={'More'} onClick={onToggle}/>
            <MenuList>
              <MenuItem icon={<FaInfoCircle/>} as={Link} to={`/${post._id}`}>Details</MenuItem>
              {post.creator === user?.username ? (
                <>
                  <MenuItem icon={<FaArrowAltCircleUp/>}  as={Link} to={`/edit-post/${post._id}`}>Update</MenuItem>
                  <MenuItem icon={<FaTrash />} onClick={handleDelete}>Delete</MenuItem>
                </>
              ) : undefined}
            </MenuList>
           </Menu>
         </Flex>
         <Stack>
           <Image
             src={
               post.selectedFile||'https://bit.ly/2Z4KKcF'
             }
            height={'400px'}
            objectFit={'cover'}
            borderRadius={'sm'}
           />
         </Stack>
         <Stack p={6} textAlign={'left'}>
           <Heading
             color={useColorModeValue('gray.700', 'white')}
             fontSize={'2xl'}
             fontFamily={'body'}>
             {post.title}
           </Heading>
           <Text color={'gray.500'}>
             {post.message}
           </Text>
         </Stack>
          <Stack direction={'row'} spacing={4} align={'left'} p={8}>
            <IconButton icon={<BsChatRightTextFill/>} aria-label={'Comments'} as={Link} to={`/${post._id}`}/>
            {post.likes.find((like) => like === user?._id) ? (
              <IconButton icon={<FaThumbsUp/>} aria-label={'Like'} onClick={handleLike}/>
            ): (
              <IconButton icon={<FaRegThumbsUp/>} aria-label={'Like'} onClick={handleLike}/>
            )}
              <Stat textAlign={'left'}>
                <StatNumber>{post.likes.length}</StatNumber>
              </Stat>
          </Stack>
       </Box>
      </>
   );
}

export default Card