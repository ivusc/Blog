import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Container, 
  Heading, 
  Image,
  Text,
  useToast
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { uploadImage } from '../api';
import { FileInput, Form } from '../components';
import { addNewPost } from '../features/postsSlice';
import { useNavigate } from 'react-router-dom';
import { convertToBase64 } from '../utils/fileUpload';
import { selectUser } from '../features/authSlice';

const CreatePost = () => {
  const user = useSelector(selectUser);
  const [postData, setPostData] = useState({
    creator: null,
    title: null,
    message: null,
    tags: [],
    likes: [],
    comments: [],
    datePosted: undefined
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  if (user === null) navigate('/sign-in');

  const handleAdd = (e) => {
    e.preventDefault();
    console.log(postData.title)
    let newPost = {
      creator: user.username,
      creatorProfile: user.profilePicture,
      title: postData.title,
      message: postData.message,
      tags: postData.tags,
      likes: [],
      comments: [],
      selectedFile: selectedFile,
      datePosted: undefined
    }
    console.log(newPost);
    dispatch(addNewPost(newPost));
    toast({
      title: 'Post created!',
      status: 'success',
      isClosable: true,
    })
    navigate('/');
  }

  const onDrop = useCallback(
    async (acceptedFile) => {
      convertToBase64(acceptedFile[0], async (result) => {
        //console.log(result);
        let fileName = acceptedFile[0].name.replace('.png','');
        const formData = new FormData();
        formData.append('image',result.replace('data:', '').replace(/^.+,/, ''))
        formData.append("name",fileName);
        const response = await uploadImage(formData);
        setSelectedFile(response.data.data.url);
      })
    },
    [],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  return (
    <Container maxW={{base:'95%', md:'55%'}} display={'flex'} flexDir={'column'} justifyContent={'start'}>
      <Heading mb={'1em'}>Create Post</Heading>
      { selectedFile && (
        <>
          <Text>File preview: </Text>
          <Image src={selectedFile} borderRadius={'xl'} mb={'1em'} maxW={'300px'} />
        </>
      )}
      <FileInput getRootProps={getRootProps} getInputProps={getInputProps} />
      <Form formData={postData} setFormData={setPostData} type={'createpost'} onSubmit={handleAdd} btnName={'Create'}/>
    </Container>
  )
}

export default CreatePost