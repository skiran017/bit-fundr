import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from './utils/theme';
import Navbar from './components/Navbar/Navbar';
import { Explore, Home } from './pages';
import { Route, Routes, useHref } from 'react-router-dom';
import Layout from './components/Layout';
import { useStateContext } from './context';

function App() {
  const { account } = useStateContext();
  const href = useHref();

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-campaigns" element={<Explore />} />
      </Routes>

      {account &&
        href !== '/' &&
        href !== '/about' &&
        href !== '/all-campaigns' && (
          <>
            <Layout />
          </>
        )}
      {!account &&
        href !== '/' &&
        href !== '/about' &&
        href !== '/all-campaigns' && (
          <Flex
            alignItems="center"
            justifyContent="center"
            pt="66px"
            h="90vh"
            fontSize="20px"
          >
            Please connect you Wallet to continue
          </Flex>
        )}
    </ChakraProvider>
  );
}

export default App;
