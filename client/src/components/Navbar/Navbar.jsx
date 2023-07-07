import React from 'react';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import { FiMenu, FiX } from 'react-icons/fi';

import { ColorModeSwitcher } from '../ColorModeSwitch/ColorModeSwitcher';
import { useStateContext } from '../../context';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';
import CustomButton from '../CustomButton/CustomButton';
import { navlinks } from '../../utils/constants';
import Sidebar from '../Sidebar/Sidebar';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const { account, handleLogin } = useStateContext();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'66px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        as="header"
        position="fixed"
        w="100%"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <FiX fontSize="20px" /> : <FiMenu fontSize="20px" />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            border="brand.custom"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            Bit Fundr
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {/* <CustomButton
            as={'a'}
            href={'#'}
            // display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            title={'Sign Up'}
          /> */}

          <CustomButton
            handleClick={handleLogin}
            title={
              account
                ? account.slice(0, 5) + '...' + account?.slice(38, 42)
                : 'Connect'
            }
          />
        </Stack>
        <ColorModeSwitcher
          justifySelf="flex-end"
          _hover={{
            background: '#ff910026',
          }}
          border="brand.custom"
          boxShadow="brand.custom"
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
