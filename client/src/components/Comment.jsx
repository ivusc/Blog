import { 
  Box,
  Flex,
  chakra,
  IconButton,
  Avatar,
  HStack,
  Stat,
  StatNumber,
  Text
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React from 'react';
import { FaRegThumbsUp, FaThumbsUp, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/authSlice';
import { Link } from 'react-router-dom';

const Comment = ({ datePosted, message, creator, profilePicture, likes, handleDeleteComment, handleLikeComment, id}) => {
  const user = useSelector(selectUser);

  return (
  <Box
    mx="auto"
    rounded="lg"
    shadow="md"
    width="full"
    bg={'gray.50'}
    _dark={{
      bg:'gray.900'
    }}
  >

    <Box p={6}>
      <Box>
        <chakra.span
          fontSize="xs"
          textTransform="uppercase"
          color="brand.600"
          _dark={{
            color: "brand.400",
          }}
        >
          {format(new Date(datePosted),'dd/MM/yyyy')}
        </chakra.span>
        <chakra.p
          mt={2}
          fontSize="md"
          color={'gray.600'}
          _dark={{
            color: 'gray.400'
          }}
        >
          {message}
        </chakra.p>
      </Box>

      <Box mt={4}>
        <Flex alignItems="center">
          <Flex alignItems="center">
            <Avatar
              src={profilePicture}
            />
            <Text
              _hover={{
                textDecoration:'underline'
              }}
              mx={2}
              fontWeight="bold"
              color="gray.700"
              _dark={{
                color: "gray.200",
              }}
              as={Link}
              to={`/profile/${creator}`}
            >
              {creator}
            </Text>
          </Flex>
          <chakra.span
            mx={1}
            fontSize="sm"
            color="gray.600"
            _dark={{
              color: "gray.300",
            }}
          >
          <HStack justifyItems={'stretch'}>
            {likes.find((like) => like === user?._id) ? (
              <IconButton icon={<FaThumbsUp/>} aria-label={'Like'} variant={'ghost'} onClick={()=>handleLikeComment(id)}/>
            ): (
              <IconButton icon={<FaRegThumbsUp/>} aria-label={'Like'} variant={'ghost'} onClick={()=>handleLikeComment(id)}/>
            )}
            <Stat>
                <StatNumber>{likes.length}</StatNumber>
            </Stat>
            {user?.username === creator ? (
              <IconButton icon={<FaTrash/>} variant={'ghost'} onClick={()=>handleDeleteComment(id)}/>
            ):undefined}
          </HStack>
          </chakra.span>
        </Flex>
      </Box>
    </Box>
  </Box>
  )
}

export default Comment