import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useStateContext } from '../context';
import DisplayCampaigns from '../components/DisplayCampaigns/DisplayCampaigns';

function Explore() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { account, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [account, contract]);

  console.log('explr', account, campaigns);

  return (
    <Box p="66px 6px 6px 6px" height="80vh">
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Box>
  );
}

export default Explore;
