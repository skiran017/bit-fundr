/** @type import('hardhat/config').HardhatUserConfig */
const { task } = require('hardhat/config');

require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    version: '0.8.10',

    networks: {
      rsk: {
        url: `https://rsk.getblock.io/${process.env.GETBLOCK_KEY}/testnet/`,
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
      localhost: {},
    },
  },
};
