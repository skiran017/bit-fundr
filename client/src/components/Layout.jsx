import React from 'react';

import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import { Dashboard, CampaignDetails, CreateCampaign } from '../pages';

function Layout() {
  return (
    <>
      <Flex p="66px 6px 0 0" w="100%">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </Flex>
    </>
  );
}

export default Layout;
