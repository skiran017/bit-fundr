import React from 'react';
import { Flex } from '@chakra-ui/react';
import Carousel from '../components/Carousel/Carousel';

function Home() {
  return (
    <Flex
      pt="82px"
      height="90vh"
      px={{ base: 4, md: 20 }}
      justifyContent="center"
      alignItems="center"
    >
      <Carousel />
    </Flex>
  );
}

export default Home;
