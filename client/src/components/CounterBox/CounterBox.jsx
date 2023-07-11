import React from 'react';
import { Flex, chakra, useColorModeValue } from '@chakra-ui/react';

function CounterBox({ title, value }) {
  return (
    <Flex direction="column" alignItems="center" w="150px">
      <chakra.h4
        fontWeight="bold"
        fontSize="30px"
        p={3}
        roundedTop={'10px'}
        w="full"
        textAlign="center"
        bg={useColorModeValue('gray.200', 'gray.900')}
      >
        {value}
      </chakra.h4>
      <chakra.p
        fontSize="16px"
        px={3}
        py={2}
        w="full"
        roundedBottom={'10px'}
        textAlign="center"
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      >
        {title}
      </chakra.p>
    </Flex>
  );
}

export default CounterBox;
