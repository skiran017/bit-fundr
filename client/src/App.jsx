import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './utils/theme';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { About, Explore, Home, CampaignDetails, NewsLetter } from './pages';
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
        <Route path="/about" element={<About />} />
        <Route path="/all-campaigns" element={<Explore />} />
      </Routes>

      {account &&
      href !== '/' &&
      href !== '/about' &&
      href !== '/all-campaigns' ? (
        <>
          <Layout />
        </>
      ) : (
        <>
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Explore />} />
          </Routes>
           */}
        </>
      )}
      <Footer />
    </ChakraProvider>
  );
}

export default App;
