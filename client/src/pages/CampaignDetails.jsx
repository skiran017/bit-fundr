import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Spinner,
  chakra,
  Flex,
  Image,
  useColorModeValue,
  Input,
  Avatar,
} from '@chakra-ui/react';
import { useStateContext } from '../context';
import CounterBox from '../components/CounterBox/CounterBox';
import CustomButton from '../components/CustomButton/CustomButton';
import { calculateBarPercentage, daysLeft } from '../utils/helpers';

function CampaignDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, account, getUserCampaigns } =
    useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  // const [userCampaigns, setUserCampaigns] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  console.log({ donators });

  // const fetchUserCampaigns = async () => {
  //   setIsLoading(true);
  //   const data = await getUserCampaigns();
  //   setUserCampaigns(data);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    if (contract) {
      // fetchUserCampaigns();
      fetchDonators();
    }
  }, [contract, account]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate('/');
    setIsLoading(false);
  };

  return (
    <Box w={'full'} p="28px">
      {isLoading && <Spinner size="lg" />}
      <Flex direction={{ base: 'column', md: 'row' }} gap={'30px'}>
        <Flex flex={1} direction="column">
          <Image
            src={state.image}
            alt="campaign"
            h="410px"
            objectFit="cover"
            rounded={'xl'}
          />
          <Box
            position="relative"
            w="full"
            h="6px"
            mt={2}
            bg={useColorModeValue('gray.200', 'gray.900')}
          >
            <Box
              position="absolute"
              h="full"
              bg="#4acd8d"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: '100%',
              }}
            ></Box>
          </Box>
        </Flex>

        <Flex
          w={{ base: 'full', md: '150px' }}
          flexWrap="wrap"
          justifyContent="space-between"
          gap="30px"
        >
          <CounterBox title="Days Left" value={remainingDays} />
          <CounterBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CounterBox title="Total Backers" value={donators.length} />
        </Flex>
      </Flex>

      <Flex mt="60px" flexDirection={{ base: 'column', lg: 'row' }} gap={5}>
        <Flex flex={2} direction="column" gap={'40px'}>
          <Box>
            <chakra.h4
              // fontFamily="epilouge"
              fontSize="18px"
              fontWeight="semibold"
              color={useColorModeValue('gray.600', 'white')}
              textTransform="uppercase"
            >
              Creator
            </chakra.h4>
            <Flex
              mt="20px"
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              gap="14px"
            >
              <Flex
              // w="52px"
              // h="52px"
              // justifyItems="center"
              // justifyContent="center"
              // rounded="full"
              // bg="#2c2f32"
              >
                {/* TODO: add user image here */}
                <Avatar />
              </Flex>
              <Box>
                <chakra.h4
                  wordBreak="break-all"
                  fontWeight="semibold"
                  fontSize="14px"
                >
                  {state.owner}
                </chakra.h4>
                <chakra.p mt="4px" fontSize="12px" color="#808191">
                  {/* TODO:get no. of campaigns of the owner dynamically*/}
                  {/* {userCampaigns.length} Campaign(s) */}
                </chakra.p>
              </Box>
            </Flex>
          </Box>

          <Box>
            <chakra.h4
              fontSize="18px"
              fontWeight="semibold"
              color={useColorModeValue('gray.600', 'white')}
              textTransform="uppercase"
            >
              Story
            </chakra.h4>

            <Box mt="20px">
              <chakra.p lineHeight="26px" textAlign="justify" color="#808191">
                {state.description}
              </chakra.p>
            </Box>
          </Box>

          <Box>
            <chakra.h4
              // fontFamily="epilouge"
              fontSize="18px"
              fontWeight="semibold"
              color={useColorModeValue('gray.600', 'white')}
              textTransform="uppercase"
            >
              Donators
            </chakra.h4>

            <Flex mt="20px" direction="column" gap={4}>
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <Flex
                    key={`${item.donator}-${index}`}
                    justifyContent="space-between"
                    alignItems="center"
                    gap={4}
                  >
                    <chakra.p
                      wordBreak="break-all"
                      lineHeight="26px"
                      color="#b2b3bd"
                    >
                      {index + 1}. {item.donator}
                    </chakra.p>
                    <chakra.p
                      wordBreak="break-all"
                      lineHeight="26px"
                      color="#808191"
                    >
                      {item.donation}
                    </chakra.p>
                  </Flex>
                ))
              ) : (
                <chakra.p lineHeight="26px" textAlign="justify" color="#808191">
                  No donators yet. Be the first one!
                </chakra.p>
              )}
            </Flex>
          </Box>
        </Flex>

        <Box flex={1}>
          <chakra.h4
            // fontFamily="epilouge"
            fontSize="18px"
            fontWeight="semibold"
            color={useColorModeValue('gray.600', 'white')}
            textTransform="uppercase"
          >
            Fund
          </chakra.h4>

          <Flex
            mt="20px"
            direction="column"
            p={4}
            bg={useColorModeValue('gray.200', 'gray.900')}
            // bg={useColorModeValue('gray.200', '#1c1c24')}
            rounded="10px"
          >
            <chakra.p fontSize="20px" textAlign="center">
              Fund the campaign
            </chakra.p>
            <Box mt="30px">
              <Input
                type="number"
                placeholder="0.1 ETH"
                step="0.01"
                w={'full'}
                py="10px"
                px={{ base: '16px', sm: '20px' }}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'white',
                }}
                _focusVisible={{
                  border: 'brand.custom',
                }}
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
              <Box
                my="20px"
                p={4}
                rounded="10px"
                bg={useColorModeValue('whiteAlpha.600', 'blackAlpha.900')}
                // bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
              >
                <chakra.h4
                  fontSize="14px"
                  fontWeight="semibold"
                  color={useColorModeValue('gray.600', 'white')}
                  lineHeight="22px"
                >
                  Back it because you believe in it.
                </chakra.h4>
                <chakra.p
                  mt="20px"
                  lineHeight="22px"
                  color={useColorModeValue('gray.800', 'gray.500')}
                >
                  Support the project for no reward, just because it speaks to
                  you.
                </chakra.p>
              </Box>
              <CustomButton
                btnType="button"
                title="Fund Campaign"
                handleClick={handleDonate}
                w="full"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CampaignDetails;
