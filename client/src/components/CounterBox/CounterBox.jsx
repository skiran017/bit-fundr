import React from 'react';
import { Flex, Text, chakra } from '@chakra-ui/react';

function CounterBox({ title, value }) {
  return (
    <Flex direction="column" justifyItems="center" w="150px">
      <chakra.h4>{value}</chakra.h4>
      <Text>{title}</Text>
    </Flex>
  );
}

export default CounterBox;
