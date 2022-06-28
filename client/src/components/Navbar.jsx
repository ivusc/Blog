import React from 'react';
import {
  chakra,
  Flex,
  HStack,
  Button,
  IconButton,
  Box,
  VStack,
  CloseButton,
  useDisclosure,
  useColorModeValue,
  VisuallyHidden,
  useColorMode,
  Image
} from '@chakra-ui/react';
import {
  AiOutlineMenu
} from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectUser } from '../features/authSlice';
import icon from '../images/blog.png';

const Navbar =() => {
  const bg = useColorModeValue("gray.50", "gray.800");
  const mobileNav = useDisclosure();
  const user = useSelector(selectUser);
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();

  const handleLogout = () => {
    mobileNav.onClose();
    dispatch(logoutUser());
  }
  
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
          md: '5em'
        }}
        py={'1em'}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Blog App"
              display="flex"
              alignItems="center"
            >
              <Image src={icon} w={8} h={8} mr={{base:'1em',md:'10px'}}></Image>
              <VisuallyHidden>Blog App</VisuallyHidden>
            </chakra.a>
            <IconButton display={{base:'flex', md:'none'}} icon={colorMode === 'light' ? <FaMoon/> : <FaSun/>} variant='ghost' onClick={toggleColorMode}/>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <IconButton icon={colorMode === 'light' ? <FaMoon/> : <FaSun/>} variant='ghost' onClick={toggleColorMode}/>
              {user === null ? (
                <Button as={NavLink} to={'/sign-in'} fontSize={'lg'} variant="ghost">
                  Sign In
                </Button>
              ): (
                <>
                  <Button as={NavLink} to={'/create-post'} fontSize={'lg'} variant="ghost">Create</Button>
                  <Button as= {NavLink} to={`/profile/${user?.username}`}  variant='ghost' fontSize={'lg'}>Profile</Button>
                  <Button onClick={handleLogout} fontSize={'lg'} variant="ghost">
                    Logout
                  </Button>
                </>
              )}
            </HStack>
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  pos={'absolute'}
                  right={0}
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Button as={NavLink} to={'/'} w="full" variant="ghost" onClick={mobileNav.onClose}>
                  Home 
                </Button>
                <Button as={NavLink} to={'/create-post'} w="full" variant="ghost" onClick={mobileNav.onClose}>
                  Create 
                </Button>
                {user === null ? (
                <Button as={NavLink} to={'/sign-in'} w="full" variant="ghost" onClick={mobileNav.onClose}>
                  Sign In
                </Button>
                ) : (
                <>
                  <Button as={NavLink} to={`/profile/${user?.username}`} w="full" variant="ghost" onClick={mobileNav.onClose}>
                    Profile
                  </Button>
                  <Button onClick={handleLogout} w="full" variant="ghost">
                    Logout
                  </Button>
                </>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
export default Navbar