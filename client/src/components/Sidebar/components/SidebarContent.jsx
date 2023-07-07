import React from 'react';
import {
  useColorModeValue,
  Box,
  Flex,
  Text,
  Link,
  Icon,
} from '@chakra-ui/react';
import { sibeBarLinkItems } from '../../../utils/constants';

function SidebarContent({ onClose, ...rest }) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      h="74vh"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Welcome
        </Text>
      </Flex>
      {sibeBarLinkItems.map(link => (
        <NavItem key={link.label} icon={link.icon} href={link.href}>
          {link.label}
        </NavItem>
      ))}
    </Box>
  );
}

const NavItem = ({ icon, children, href, ...rest }) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
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
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="20"
            color="brand.custom"
            // _groupHover={{
            //   color: 'brand.custom',
            // }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default SidebarContent;
