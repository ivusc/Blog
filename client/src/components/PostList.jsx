import { GridItem } from '@chakra-ui/react';
import React from 'react'

import Card from './Card';

const PostList = ({user, posts, postStatus, error}) => {

  let content;
  
  if (postStatus === 'loading') {
      content = <p>"Loading..."</p>;
  } else if (postStatus === 'succeeded') {
      if (user === 'all'){
        content = posts.map((post) => (
          <GridItem colSpan={{ base: 4, md: 2, lg: 1}} key={post._id}>
            <Card post={post} />
          </GridItem>
        ))
      }
      else{
        content = posts.filter((post) => post.creator === user).map((post) => (
          <GridItem colSpan={{ base: 4, md: 2, lg: 1}} key={post._id}>
            <Card post={post} />
          </GridItem>
        ))
      }
  } else if (postStatus === 'failed') {
      content = <p>{error}</p>;
  }

  return (
    <>
      {content}
    </>
  )
}

export default PostList