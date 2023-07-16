import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useStateContext } from '../context';
import DisplayCampaigns from '../components/DisplayCampaigns/DisplayCampaigns';

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [userCampaigns, setUserCampaigns] = useState([]);

  const { account, contract, getUserCampaigns } = useStateContext();

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setUserCampaigns(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contract) fetchUserCampaigns();
  }, [account, contract]);

  return (
    <Box p={6} w="100%">
      <DisplayCampaigns
        title="Your Campaigns"
        isLoading={isLoading}
        campaigns={userCampaigns}
      />
    </Box>
  );
}

export default Dashboard;
