import React, { useState, useContext, createContext, useEffect } from 'react';
import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Eth from 'ethjs-query';
import Portis from '@portis/web3';
import Torus from '@toruslabs/torus-embed';
import { trezorProviderOptions } from '@rsksmart/rlogin-trezor-provider';
import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider';
import { dcentProviderOptions } from '@rsksmart/rlogin-dcent-provider';
import CROWDFUND_ABI from '../abi/crowdfund.json';

import * as ethers from 'ethers';

const rpcUrls = {
  30: 'https://public-node.rsk.co',
  31: 'https://public-node.testnet.rsk.co',
  1: 'https://mainnet.infura.io/v3/7d5d71df32d548249ff444f6a43b43c5', // Ethereum Mainnet
  5: 'https://goerli.infura.io/v3/7d5d71df32d548249ff444f6a43b43c5', // Goerli
};

const supportedChains = Object.keys(rpcUrls).map(Number);

const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: rpcUrls,
        bridge: 'https://walletconnect-bridge.rifos.org/',
      },
    },
    portis: {
      package: Portis,
      options: {
        id: 'a1c8672b-7b1c-476b-b3d0-41c27d575920',
        network: {
          nodeUrl: 'https://public-node.testnet.rsk.co',
          chainId: 31,
        },
      },
    },
    torus: {
      package: Torus,
    },
    'custom-ledger': {
      ...ledgerProviderOptions,
    },
    'custom-dcent': {
      ...dcentProviderOptions,
    },
    'custom-trezor': {
      ...trezorProviderOptions,
    },
  },
  rpcUrls,
  supportedChains,
});

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [rLoginResponse, setRLoginResponse] = useState(null);

  // wallet info:
  const [account, setAccount] = useState();
  const [chainId, setChainId] = useState(null);
  const [connectResponse, setConnectResponse] = useState(null);

  //contract
  const [contract, setContract] = useState();

  const RPCprovider = new ethers.JsonRpcProvider(
    `https://rsk.getblock.io/${process.env.REACT_APP_GET_BLOCK_KEY}/testnet/`
  );

  // Use the rLogin instance to connect to the provider
  const handleLogin = async () => {
    rLogin
      .connect()
      .then(response => {
        // set a local variable for the response:
        const provider = response.provider;
        setConnectResponse('Connected');

        // Use ethQuery to get the user's account and the chainId
        const ethQuery = new Eth(provider);
        ethQuery.accounts().then(accounts => setAccount(accounts[0]));
        ethQuery.net_version().then(id => setChainId(id));

        // Listen to the events emitted by the wallet. If changing account, remove the listeners
        // below and connect again. If disconnect or change chains, then logout.
        provider.on('accountsChanged', accounts => {
          if (accounts.length === 0) {
            return handleLogOut(response);
          }
          provider.removeAllListeners && provider.removeAllListeners();
          handleLogin();
        });
        provider.on('chainChanged', () => handleLogOut(response));
        provider.on('disconnect', () => handleLogOut(response));

        // finally, set the provider in local state to be used for signing and sending transactions
        setRLoginResponse(response);
      })
      // catch an error and if there is a message display it. Closing WalletConnect without a
      // connection will throw an error with no response, which is why we check:
      .catch(error => console.log('the error:', error));
    // .catch(err => err && err.message && setConnectResponse(`[ERROR]: ${err.message}`))
  };

  // handle logging out
  const handleLogOut = response => {
    // remove EIP 1193 listeners that were set above

    response.provider.removeAllListeners &&
      response.provider.removeAllListeners();

    // send the disconnect method
    response.disconnect();
  };

  /**
   * Returns the contract
   * @returns contract
   */
  const getContract = async () => {
    const contract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      CROWDFUND_ABI,
      RPCprovider.provider
    );
    return contract;
  };

  const fetchContract = async () => {
    const contract = await getContract();
    setContract(contract);
  };

  useEffect(() => {
    fetchContract();
  }, [account]);

  /**
   * Returns the transcation after publishing campaign
   * @param form input from the form
   * @returns transaction
   */
  const publishCampaign = async form => {
    const formData = {
      owner: account, // owner
      title: form.title, // title
      description: form.description, // description
      target: form.target,
      deadline: new Date(form.deadline).getTime(), // deadline,
      image: form.image,
    };

    if (rLoginResponse !== null) {
      try {
        const provider = new ethers.BrowserProvider(rLoginResponse.provider);
        const signer = await provider.getSigner();

        const values = Object.values(formData);
        let transaction = await contract
          .connect(signer)
          .createCampaign(...values);

        console.log({ transaction });
        await transaction.wait();
        console.log('contract call success', transaction);
      } catch (error) {
        console.log('contract call failure', error);
      }
    }
  };

  /**
   * Returns all exisiting campaigns
   * @returns parsed campaigns data
   */
  const getCampaigns = async () => {
    let campaigns, parsedCampaings;

    campaigns = await contract.getCampaigns();

    console.log('raw', campaigns);

    parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.formatEther(campaign.target.toString()),
      deadline: Number(campaign.deadline),
      amountCollected: ethers.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i,
      isActive: campaign.isActive,
      isCompleted: campaign.isCompleted,
      isExpired: campaign.isExpired,
    }));

    return parsedCampaings;
  };

  /**
   * Returns filtered user campaigns based on account address
   * @returns user created campaigns
   */
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(campaign => {
      return campaign?.owner.toLowerCase() === account?.toLowerCase();
    });

    return filteredCampaigns;
  };

  /**
   * Returns transaction after successful donation
   * @param pId campaign Id
   * @param amount The amount to donate
   * @returns Transaction
   */
  const donate = async (pId, amount) => {
    if (rLoginResponse !== null) {
      const provider = new ethers.BrowserProvider(rLoginResponse.provider);
      const signer = await provider.getSigner();

      let transaction = await contract.connect(signer).donateToCampaign(pId, {
        value: ethers.parseEther(amount),
      });
      await transaction.wait();
    }
  };

  /**
   * Returns the donated amount and the donor address
   * @param pId campaign Id
   * @returns Donated amount and Donator address
   */
  const getDonations = async pId => {
    const donations = await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  console.log({ contract });

  return (
    <StateContext.Provider
      value={{
        rLoginResponse,
        chainId,
        account,
        connectResponse,
        handleLogin,
        handleLogOut,
        contract,
        publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
