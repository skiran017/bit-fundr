import React from 'react';

import { Flex } from '@chakra-ui/react';

import Sidebar from './Sidebar/Sidebar';

function Layout({ children }) {
  return (
    <>
      <Flex height="81vh" p="66px 8px 12px 8px" w="100%">
        <Sidebar />
        {children}
      </Flex>
    </>
  );
}

export default Layout;
