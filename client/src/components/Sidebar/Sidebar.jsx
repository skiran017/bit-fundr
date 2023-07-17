import React from 'react';
import {
  useColorModeValue,
  useDisclosure,
  Drawer,
  DrawerContent,
  Box,
} from '@chakra-ui/react';
import SidebarContent from './components/SidebarContent';

function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} height="full">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      {/* TODO: add responsiveness */}
      {/* <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box> */}
    </Box>
  );
}

export default Sidebar;
