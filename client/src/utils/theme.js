import { extendTheme, Button } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      custom: '#ff9100',
    },
  },
  borders: {
    brand: {
      custom: '1px solid #ff9100',
    },
  },
  shadows: {
    brand: {
      custom: '0 0 16px 0 rgb(255 145 0 / 0.3)',
    },
  },
  components: {
    brand: {
      custom: (
        <Button
          background="brand.custom"
          opacity="0.5"
          _hover={{
            background: '#ff9100',
            opacity: '1',
          }}
          boxShadow="brand.custom"
        />
      ),
    },
  },
});
