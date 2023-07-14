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
    <Box p={4}>
      <chakra.h1 fontSize="18px" fontWeight="semibold">
        {title} {campaigns.length}
      </chakra.h1>

      <Flex flexWrap="wrap" mt="20px" gap="26px">
        {isLoading && <Spinner />}
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
