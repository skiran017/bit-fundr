import React from 'react';
import { useNavigate } from 'react-router-dom';
import AmountCard from '../AmountCard/AmountCard';
import { chakra, Spinner, Flex, Box } from '@chakra-ui/react';
import { useStateContext } from '../../context';

function DisplayCampaigns({ title, isLoading, campaigns }) {
  const navigate = useNavigate();
  const { account } = useStateContext();
  const handleNavigate = campaign => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <Box pb="16px">
      <chakra.h1 fontSize="18px" fontWeight="semibold" mb="26px">
        {title} {campaigns.length}
      </chakra.h1>

      <Flex flexWrap="wrap" mt="20px" gap={12}>
        {isLoading && (
          <Flex alignItems="center" justifyContent="center" w="full" h="60vh">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="brand.custom"
              size="xl"
            />
          </Flex>
        )}
        {!isLoading && campaigns.length === 0 && (
          <chakra.p fontSize="14px" fontWeight="semibold">
            No campaigns created
          </chakra.p>
        )}
        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map(campaign => (
            <AmountCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => account && handleNavigate(campaign)}
            />
          ))}
      </Flex>
    </Box>
  );
}

export default DisplayCampaigns;
