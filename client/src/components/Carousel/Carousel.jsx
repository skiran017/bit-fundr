import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState();

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  const text = useColorModeValue('gray.600', 'gray.800');

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title:
        'Welcome to BitFundr  Empowering Innovation on the Bitcoin Network',
      text: 'Unlock the power of Bitcoin crowdfunding with BitFundr - the innovative platform where project creators and backers come together to fuel innovation and shape the future of the Bitcoin ecosystem.',
      image:
        'https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-with-digital-circuit-lines-background_1017-33592.jpg?size=626&ext=jpg',
    },
    {
      title: 'Join the Bitcoin Crowdfunding Revolution',
      text: 'Embrace the power of the Bitcoin community and be a catalyst for innovation on BitFundr. Join our platform to support groundbreaking projects, harness the benefits of the Rootstock blockchain, and make a meaningful impact within the Bitcoin ecosystem.',
      image:
        'https://img.freepik.com/free-photo/men-exchanging-bitcoin-with-copy-space_23-2148793793.jpg?w=1380&t=st=1689424707~exp=1689425307~hmac=96a9284c242d3243a61e6e053dd4c9cf34892690f1b741eada56a6c2dccdf3e8',
    },
    {
      title: 'Discover Inspiring Projects and Make an Impact',
      text: 'Explore a world of transformative projects on BitFundr, where game-changing ideas become reality. Back visionary entrepreneurs, participate in the growth of the Bitcoin ecosystem, and unlock exciting rewards as you contribute to the success of innovative ventures.',
      image:
        'https://github.com/skiran017/dex/assets/23178403/7a4a0063-2b3b-4ce8-841f-c14fa955cb5a',
    },
  ];

  return (
    <Box
      position={'relative'}
      height={'70vh'}
      width={'full'}
      overflow={'hidden'}
      rounded="12px"
    >
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider  */}
      <Slider {...settings} ref={slider => setSlider(slider)}>
        {cards?.map((card, index) => (
          <Box
            key={index}
            height={'6xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Box
              position={'absolute'}
              w={'100%'}
              h={'100%'}
              top={0}
              left={0}
              bg={'rgb(0,0,0,0.6)'}
            />
            {/* This is the block you need to change, to customize the caption */}
            <Container height="600px" position="relative">
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)"
              >
                <Heading
                  fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                  color={'orange'}
                >
                  {card.title}
                </Heading>
                <Text
                  fontSize={{ base: 'md', md: 'lg', lg: 'lg' }}
                  color={'white'}
                  w="full"
                >
                  {card.text}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
