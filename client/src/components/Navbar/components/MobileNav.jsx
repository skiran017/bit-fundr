import React from 'react';
import { Stack, Flex, Text, Link, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { NAV_ITEMS } from '../../../utils/constants';

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      pt="82px"
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} href={navItem.href} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  const navigate = useNavigate();

  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={Link}
        onClick={() => navigate(href)}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

export default MobileNav;
