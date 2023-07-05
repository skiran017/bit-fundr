import React, { useState, useContext, createContext } from 'react';
import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Eth from 'ethjs-query';
import Portis from '@portis/web3';
import Torus from '@toruslabs/torus-embed';
import { trezorProviderOptions } from '@rsksmart/rlogin-trezor-provider';
import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider';
import { dcentProviderOptions } from '@rsksmart/rlogin-dcent-provider';
import Web3 from 'web3';

import { ethers } from 'ethers';

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
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [connectResponse, setConnectResponse] = useState(null);

  // signing data:
  const [signDataInput, setSignDataInput] = useState('hello world!');
  const [signDataResponse, setSignDataResponse] = useState(null);

  // sending transactions:
  const [sendToInput, setSendToInput] = useState('');
  const [sendAmount, setSendAmount] = useState('100000');
  const [sendResponse, setSendResponse] = useState(null);

  // sign typed data:
  const [signTypedDataInput, setSignTypedDataInput] = useState('');
  const [signTypedDataResponse, setSignTypedDataResponse] = useState(null);

  // Use the rLogin instance to connect to the provider
  const handleLogin = () => {
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

  // Handle the requests to the provider
  const providerRPC = (provider, args) => provider.request(args);

  // Sign typed data
  // const handleSignTypedData = value => {
  //   setSignTypedDataResponse('loading...');
  //   msgParams.message.contents = value;

  //   providerRPC(rLoginResponse.provider, {
  //     method: 'eth_signTypedData_v4',
  //     params: [account, JSON.stringify(msgParams)],
  //     from: account,
  //   })
  //     .then(response => setSignTypedDataResponse(response))
  //     .catch(error => setSignTypedDataResponse(`[ERROR]: ${error.message}`));
  // };

  // Sign data
  const handleSignData = value => {
    setSignDataResponse('loading...');

    providerRPC(rLoginResponse.provider, {
      method: 'personal_sign',
      params: [value, account],
    })
      .then(response => setSignDataResponse(response))
      .catch(error => setSignDataResponse(`[ERROR]: ${error.message}`));
  };

  // Sign data WEB3
  const handleSignDataWEB3 = async value => {
    if (rLoginResponse !== null) {
      const web3 = new Web3(rLoginResponse.provider);
      const fromAddress = (await web3.eth.getAccounts())[0];
      const signedMessage = await web3.eth.personal
        .sign(value, fromAddress)
        .catch(error => setSignDataResponse(`[ERROR]: ${error.message}`));
      setSignDataResponse(signedMessage);
    }
  };

  // Sign data Ethers
  // const handleSignDataEthers = async value => {
  //   if (rLoginResponse !== null) {
  //     const provider = new ethers.providers.Web3Provider(
  //       rLoginResponse.provider
  //     );
  //     const signer = provider.getSigner();
  //     const signedMessage = await signer
  //       .signMessage(value)
  //       .catch(error => setSignDataResponse(`[ERROR]: ${error.message}`));
  //     setSignDataResponse(signedMessage);
  //   }
  // };

  // Send transaction
  const handleSendTransaction = (to, value) => {
    setSendResponse('loading...');

    providerRPC(rLoginResponse.provider, {
      method: 'eth_sendTransaction',
      params: [{ from: account, to, value }],
    })
      .then(response => setSendResponse(response))
      .catch(error => setSendResponse(`[ERROR]: ${error.message}`));
  };

  // Send transaction
  const handleSendTransactionWEB3 = async (to, value) => {
    setSendResponse('loading...');
    if (rLoginResponse !== null) {
      const web3 = new Web3(rLoginResponse.provider);
      const fromAddress = (await web3.eth.getAccounts())[0];
      web3.eth
        .sendTransaction({
          from: fromAddress.toLowerCase(),
          to: to.toLowerCase(),
          value: value,
        })
        .then(response => setSendResponse(response))
        .catch(error => setSendResponse(`[ERROR]: ${error.message}`));
    }
  };

  // Send transaction
  // const handleSendTransactionEthers = (to, value) => {
  //   setSendResponse('loading...');
  //   if (rLoginResponse !== null) {
  //     const provider = new ethers.providers.Web3Provider(
  //       rLoginResponse.provider
  //     );
  //     const signer = provider.getSigner();
  //     setSendResponse('Please check your wallet');
  //     signer
  //       .sendTransaction({ to: to.toLowerCase(), value: parseInt(value) })
  //       .then(response => setSendResponse(response.hash))
  //       .catch(error => setSendResponse(`[ERROR]: ${error.message}`));
  //   }
  // };

  // handle logging out
  const handleLogOut = response => {
    // remove EIP 1193 listeners that were set above
    response.provider.removeAllListeners &&
      response.provider.removeAllListeners();

    // send the disconnect method
    response.disconnect();
  };

  return (
    <StateContext.Provider
      value={{
        rLoginResponse,
        chainId,
        account,
        connectResponse,
        handleLogin,
        handleLogOut,
        //contract
        // createCampaign: publishCampaign,
        // getCampaigns,
        // getUserCampaigns,
        // donate,
        // getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
