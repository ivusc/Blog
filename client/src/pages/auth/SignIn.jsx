import { 
  Container,
  chakra,
  Heading,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from '../../api';

import { Form } from '../../components';
import { signInUser } from '../../features/authSlice';
import icon from '../../images/blog.png';

const SignIn = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const response = await signIn(userData).catch((err) => {
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
        title: 'Logged in successfully!',
        status: 'success',
        isClosable: true,
      })
      dispatch(signInUser(response.data));
      navigate('/');
    }
  }

  return (
    <Container maxW={{base:'95%', md:'50%', xl:'25%'}} display={'flex'} flexDir={'column'} justifyContent={'start'}>
      <Heading mb={'0.25em'}>Login to your account</Heading>
      <Text mb={'2em'}>Don&apos;t have an account? Sign up <chakra.a _hover={{ textDecoration: 'underline'}} as={Link} to='/sign-up' color={useColorModeValue('blue.600','blue.300')}>here</chakra.a>.</Text>
      <Image src={icon} display={'flex'} alignSelf={'center'} width={'200px'} height={'200px'} mb={'2em'}/>
      <Form type={'login'} formData={userData} setFormData={setUserData} onSubmit={handleSignIn} btnName={'Sign In'}/>
    </Container>
  )
}

export default SignIn