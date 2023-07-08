import React from 'react';

import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import { Dashboard } from '../pages';

function Layout({ children }) {
  return (
    <>
      <Flex h="100vh" p="66px 6px 10px 0" w="100%">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        {children}
      </Flex>
    </>
  );
}

export default Layout;
