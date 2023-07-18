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
  const { donate, getDonations, contract, account } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  // const [userCampaigns, setUserCampaigns] = useState([]);

  const remainingDays = daysLeft(state.deadline);
  const bgColorValuegray = useColorModeValue('gray.200', 'gray.900');
  const lightGray = useColorModeValue('gray.800', 'gray.500');
  const grayWhite = useColorModeValue('gray.600', 'white');
  const blackWhite = useColorModeValue('whiteAlpha.900', 'whiteAlpha.200');
  const bgColorValuewhite = useColorModeValue(
    'whiteAlpha.600',
    'blackAlpha.900'
  );

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) {
      fetchDonators();
    }
  }, [contract, account]);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      await donate(state.pId, amount);
      navigate('/all-campaigns');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box w={'full'} p="28px">
      {isLoading && (
        <Flex height="full" alignItems="center" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.custom"
            size="xl"
          />
        </Flex>
      )}
      {!isLoading && (
        <>
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
                bg={bgColorValuegray}
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
                {+remainingDays < 0 ? (
                  <Box
                    mt="12px"
                    color="red"
                    fontStyle="italic"
                    fontWeight="semibold"
                  >
                    **This Campaign has expired.
                  </Box>
                ) : null}
              </Box>
            </Flex>

            <Flex
              w={{ base: 'full', md: '150px' }}
              flexWrap="wrap"
              justifyContent="space-between"
              gap="30px"
            >
              <CounterBox
                title="Days Left"
                value={+remainingDays >= 0 ? remainingDays : 'Expired'}
              />
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
                  fontSize="18px"
                  fontWeight="semibold"
                  color={grayWhite}
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
                  <Flex>
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
                  color={grayWhite}
                  textTransform="uppercase"
                >
                  Story
                </chakra.h4>

                <Box mt="20px">
                  <chakra.p
                    lineHeight="26px"
                    textAlign="justify"
                    color="#808191"
                  >
                    {state.description}
                  </chakra.p>
                </Box>
              </Box>

              <Box>
                <chakra.h4
                  fontSize="18px"
                  fontWeight="semibold"
                  color={grayWhite}
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
                    <chakra.p
                      lineHeight="26px"
                      textAlign="justify"
                      color="#808191"
                    >
                      No donators yet. Be the first one!
                    </chakra.p>
                  )}
                </Flex>
              </Box>
            </Flex>

            <Box flex={1}>
              <chakra.h4
                fontSize="18px"
                fontWeight="semibold"
                color={grayWhite}
                textTransform="uppercase"
              >
                Fund
              </chakra.h4>

              <Flex
                mt="20px"
                direction="column"
                p={4}
                bg={bgColorValuegray}
                rounded="10px"
              >
                <chakra.p fontSize="20px" textAlign="center">
                  Fund the campaign
                </chakra.p>
                <Box mt="30px">
                  <Input
                    type="number"
                    placeholder="0.1 RBTC"
                    step="0.01"
                    w={'full'}
                    py="10px"
                    px={{ base: '16px', sm: '20px' }}
                    bg={blackWhite}
                    border={0}
                    _focus={{
                      bg: blackWhite,
                    }}
                    _focusVisible={{
                      border: 'brand.custom',
                    }}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                  />
                  <Box my="20px" p={4} rounded="10px" bg={bgColorValuewhite}>
                    <chakra.h4
                      fontSize="14px"
                      fontWeight="semibold"
                      color={grayWhite}
                      lineHeight="22px"
                    >
                      Back it because you believe in it.
                    </chakra.h4>
                    <chakra.p mt="20px" lineHeight="22px" color={lightGray}>
                      Support the project for no reward, just because it speaks
                      to you.
                    </chakra.p>
                  </Box>
                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    handleClick={handleDonate}
                    w="full"
                    isDisabled={+amount <= 0 || +remainingDays < 0}
                  />
                </Box>
              </Flex>
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
}

export default CampaignDetails;
