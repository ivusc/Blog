import { 
  Container, 
  Grid, 
  Heading, 
  HStack, 
  Image, 
  Input,
  Select,
  VStack, 
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPostsError, getPostsStatus, selectAllPosts } from '../features/postsSlice';

import { PostList } from '../components';
import icon from '../images/blog.png';

const Home = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  const [search, setSearch] = useState('');
  const [searchedPosts, setSearchedPosts] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [activeSelect, setActiveSelect] = useState('Latest');

  const onHandleSearch = (value) => {
    const filteredPosts = posts.filter((post) => 
      post.title.toLowerCase().includes(value.toLowerCase()));

      if (filteredPosts.length){
        setSearchedPosts(filteredPosts);
      }
  }

  useEffect(()=>{
    const timer = setTimeout(()=>(
      setSearch(debouncedSearch)
    ),1000);

    return () => clearTimeout(timer)
  },[debouncedSearch])

  useEffect(()=>{
    if (search){
      onHandleSearch(search);
    } else {
      const defaultPosts = [...posts];
      setSearchedPosts(defaultPosts.sort((a, b) => b.datePosted.localeCompare(a.datePosted)));
    }
  },[search])

  useEffect(()=>{
    //if (!posts) return;
    const sortedPosts = [...posts];

    switch(activeSelect){
      case 'Newest':
        setSearchedPosts(sortedPosts.sort((a, b) => b.datePosted.localeCompare(a.datePosted)));
        break;
      case 'Oldest':
        setSearchedPosts(sortedPosts.sort((a, b) => a.datePosted.localeCompare(b.datePosted)));
        break;
      case 'Most Liked':
        setSearchedPosts(sortedPosts.sort((a, b) => b.likes.length - a.likes.length));
        break;
      default:
        setSearchedPosts(sortedPosts.sort((a, b) => b.datePosted.localeCompare(a.datePosted)));
        break;
    }
  },[activeSelect,posts])

  const handleSelectChange = (e) => setActiveSelect(e.target.value)

  if (!searchedPosts || !posts) return <p>Loading...</p>


  return (
    <Container maxW={{base:'100%', md:'85%'}} textAlign={'center'} display={'flex'} flexDir={'column'} alignItems={'center'}>
      <HStack mb={'2em'}>
        <Image src={icon} w={8} h={8} mr={3} display={{base:'none',md:'inherit'}}></Image>
        <Heading fontSize={'5xl'}>Blog App</Heading>
      </HStack>
      <VStack mb={'2em'} display={{base:'flex',md:'none'}}>
        <Input placeholder='Search for post...' width={'20em'}  
          onChange={(e)=>setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
        <Select value={activeSelect} onChange={handleSelectChange} placeholder='Sort' width={'8em'} >
        {['Newest','Oldest','Most Liked'].map((item)=>(
          <option value={item} key={item}>{item}</option>
        ))}
        </Select>
      </VStack>
      <HStack mb={'2em'} display={{base:'none',md:'flex'}}>
        <Input placeholder='Search for post...' width={'20em'}  
          onChange={(e)=>setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
        <Select value={activeSelect} onChange={handleSelectChange} placeholder='Sort' width={'8em'} >
        {['Newest','Oldest','Most Liked'].map((item)=>(
          <option value={item} key={item}>{item}</option>
        ))}
        </Select>
      </HStack>
      <Grid templateColumns='repeat(4, 1fr)' gap={5}>
        <PostList user={'all'} postStatus={postStatus} posts={searchedPosts ? searchedPosts : posts} error={error} />
      </Grid>
    </Container>
  )
}

export default Home