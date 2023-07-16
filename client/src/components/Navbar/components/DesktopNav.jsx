import React from 'react';
import { useColorModeValue, Stack, Box, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { NAV_ITEMS } from '../../../utils/constants';

const DesktopNav = () => {
  const navigate = useNavigate();
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Link
            p={2}
            onClick={() => navigate(navItem.href)}
            // href={navItem.href ?? '#'}
            fontSize={'16px'}
            fontWeight={'semibold'}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
