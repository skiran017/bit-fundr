import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitch/ColorModeSwitcher';
import { theme } from './utils/theme';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <>
        <Navbar />
      </>
    </ChakraProvider>
  );
}

export default App;
