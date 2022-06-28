import { 
  Avatar,
  Container, 
  FormLabel, 
  Heading, 
  Text,
  useColorModeValue,
  useToast,
  chakra
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { signUp, uploadImage } from '../../api';
import { FileInput, Form } from '../../components';
import { signUpUser } from '../../features/authSlice';
import { convertToBase64 } from '../../utils/fileUpload';

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    cfmPassword: '',
    profilePicture: null,
    datePosted: undefined
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const onDrop = useCallback(
    async (acceptedFile) => {
      convertToBase64(acceptedFile[0], async (result) => {
        //console.log(result);
        let fileName = acceptedFile[0].name.replace('.png','');
        const formData = new FormData();
        formData.append('image',result.replace('data:', '').replace(/^.+,/, ''))
        formData.append("name",fileName);
        const response = await uploadImage(formData);
        setUserData(()=>({...userData, profilePicture: response.data.data.url}));
      })
    },
    [],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (userData.password !== userData.cfmPassword){
      toast({
        title: 'Password entered is not the same!',
        status: 'error',
        isClosable: true,
      });
      return;
    }

    let user = {
      username: userData.username,
      password: userData.password,
      profilePicture: userData.profilePicture,
      datePosted: undefined
    }

    const response = await signUp(userData).catch((err) => {
      if (err.response){
        toast({
          title: err.response.data.message,
          status: 'error',
          isClosable: true,
        })
      }
    });

    if (response.status === 200){
      toast({
        title: 'Signed up successfully!',
        status: 'success',
        isClosable: true,
      })
      dispatch(signUpUser(response.data));
      navigate('/');
    }
    
  }
  
  return (
    <Container maxW={{base:'95%', md:'35%'}} display={'flex'} flexDir={'column'} justifyContent={'start'}>
      <Heading mb={'0.25em'}>Sign Up</Heading>
      <Text mb={'2em'}>Have an account? Sign in <chakra.a _hover={{ textDecoration: 'underline'}} as={Link} to='/sign-in' color={useColorModeValue('blue.600','blue.300')}>here</chakra.a> instead.</Text>
      {userData.profilePicture && (
        <>
          <Text fontWeight={'bold'} fontSize={'lg'}>Profile Picture preview: </Text>
          <Avatar display={'flex'} alignSelf={'center'} src={userData.profilePicture} width={'200px'} height={'200px'} mb={'1em'} mt={'1em'}/>
        </>
      )}
      <FormLabel>Profile picture upload</FormLabel>
      <FileInput getInputProps={getInputProps} getRootProps={getRootProps} />
      <Form type={'signup'} formData={userData} setFormData={setUserData} onSubmit={handleSignUp} btnName={'Sign Up'}/>
    </Container>
  )
}

export default SignUp