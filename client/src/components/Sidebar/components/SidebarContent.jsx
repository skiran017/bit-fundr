import React, { useState } from 'react';
import { useColorModeValue, Box, Flex, Text, Icon } from '@chakra-ui/react';
import { sibeBarLinkItems } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

function SidebarContent({ onClose, ...rest }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('Dashboard');
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: '72' }}
      h="92vh"
      mt="6px"
      pl={'40px'}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Welcome
        </Text>
      </Flex>
      {sibeBarLinkItems.map(link => (
        <NavItem
          key={link.label}
          icon={link.icon}
          // isActive={isActive}
          handleClick={() => {
            if (!link.disabled) {
              setIsActive(link.label);
              navigate(link.href);
            }
          }}
        >
          {link.label}
        </NavItem>
      ))}
    </Box>
  );
}

const NavItem = ({ icon, children, handleClick, ...rest }) => {
  return (
    // <Link
    //   href={href}
    //   style={{ textDecoration: 'none' }}
    //   _focus={{ boxShadow: 'none' }}
    // >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: '#ff910026',
        color: useColorModeValue('gray.800', 'gray.200'),
      }}
      {...rest}
      onClick={handleClick}
      _active={{
        transform: 'scale(0.98)',
      }}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="20"
          // color="brand.custom"
          _groupHover={{
            color: 'brand.custom',
          }}
          boxShadow="brand.custom"
          as={icon}
        />
      )}
      {children}
    </Flex>
    // </Link>
  );
};

export default SidebarContent;
