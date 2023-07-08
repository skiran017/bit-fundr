import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useStateContext } from '../context';
import DisplayCampaigns from '../components/DisplayCampaigns/DisplayCampaigns';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  console.log({ campaigns });

  return (
    <Box p="6px" w="100%">
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Box>
  );
}

export default Dashboard;
