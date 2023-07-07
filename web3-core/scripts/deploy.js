const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();;

  console.log('Deploying contracts with the account:', deployer.address);

  const crowdFunding = await ethers.deployContract('CrowdFunding');

  console.log('contract address:', await crowdFunding.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
