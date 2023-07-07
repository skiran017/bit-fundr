/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.10',

    networks: {
      // goerli: {
      //   url: 'https://rpc.ankr.com/eth_goerli',
      //   accounts: [`0x${process.env.PRIVATE_KEY}`],
      //   // accounts: [`0x${process.env.PRIVATE_KEY}`],
      // },
      rsk: {
        url: `https://rsk.getblock.io/${process.env.GETBLOCK_KEY}/testnet/`,
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
