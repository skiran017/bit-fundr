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
  Avatar,
  Menu,
  MenuList,
  MenuButton,
  Center,
  Button,
  MenuDivider,
  MenuItem,
} from '@chakra-ui/react';

import { FiMenu, FiX } from 'react-icons/fi';

import { ColorModeSwitcher } from '../ColorModeSwitch/ColorModeSwitcher';
import { useStateContext } from '../../context';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { account, handleLogin, handleLogOut, rLoginResponse } =
    useStateContext();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'80px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 20 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.600')}
        align={'center'}
        as="nav"
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
            fontSize="18px"
            fontWeight="bold"
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
          {account && (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                border="brand.custom"
              >
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem
                  onClick={() => navigate('/dashboard')}
                  _hover={{
                    bg: '#ff910026',
                  }}
                  _focus={{
                    bg: '#ff910026',
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  _hover={{
                    bg: '#ff910026',
                  }}
                  onClick={() => {
                    handleLogOut(rLoginResponse);
                    // localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER');
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          )}
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
