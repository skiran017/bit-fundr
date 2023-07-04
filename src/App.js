import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitch/ColorModeSwitcher';
import { theme } from './utils/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeSwitcher justifySelf="flex-end" />
    </ChakraProvider>
  );
}

export default App;
