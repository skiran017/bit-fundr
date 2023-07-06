import React from 'react';
import { Button } from '@chakra-ui/react';

function CustomButton({ btnType, title, handleClick, ...props }) {
  return (
    <Button
      variant="ghost"
      fontWeight={600}
      _hover={{
        background: '#ff910026',
      }}
      _active={{
        background: '#ff910026',
        transform: 'scale(0.98)',
      }}
      border="brand.custom"
      boxShadow="brand.custom"
      type={btnType}
      onClick={handleClick}
      {...props}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
