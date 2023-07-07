import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './utils/theme';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { About, Explore, Home } from './pages';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/campaigns" element={<Explore />} />
        </Routes>
      </Layout>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
