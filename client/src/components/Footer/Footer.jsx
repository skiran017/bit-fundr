import React from 'react';
import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaDiscord } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      border="brand.custom"
      boxShadow="brand.custom"
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        transform: 'scale(1.1)',
        transition: '0.3s',
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      // position="relative"
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box display={'flex'}>
              {/* <Logo color={useColorModeValue('gray.700', 'white')} /> */}
              <Text fontSize="2xl" fontWeight="600">
                Bit Fundr
              </Text>
            </Box>
            <Text fontSize={'sm'}>© 2023 Bit Fundr. All rights reserved</Text>
            <Stack direction={'row'} spacing={6}>
              <SocialButton border="1px solid red" label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Discord'} href={'#'}>
                <FaDiscord />
              </SocialButton>
            </Stack>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Company</ListHeader>
            <Link href={'#'}>About us</Link>
            <Link href={'#'}>Blog</Link>
            <Link href={'#'}>Contact us</Link>
            <Link href={'#'}>Testimonials</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'#'}>Help Center</Link>
            <Link href={'#'}>Terms of Service</Link>
            <Link href={'#'}>Legal</Link>
            <Link href={'#'}>Privacy Policy</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
                _focusVisible={{
                  border: 'brand.custom',
                }}
              />
              <IconButton
                bg={useColorModeValue('#ff9100', '#ff910026')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: '#ff9100',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
