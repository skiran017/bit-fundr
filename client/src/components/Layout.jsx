import React from 'react';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import { Box, Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { About, Explore, Home } from '../pages';
import Sidebar from './Sidebar/Sidebar';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Flex height="80vh" p="66px 8px 12px 8px">
        <Sidebar />
        {children}
      </Flex>
      <Footer />
    </>
  );
}

export default Layout;
