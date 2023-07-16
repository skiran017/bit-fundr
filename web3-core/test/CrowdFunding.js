const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('CrowdFunding', function () {
  let crowdFunding, accounts, account1;

  beforeEach(async () => {
    const CrowdFunding = await ethers.getContractFactory('CrowdFunding');
    crowdFunding = await CrowdFunding.deploy();
    await crowdFunding.deployed();

    accounts = await ethers.getSigners();
    account1 = accounts[0];

    const owner = account1.address; // Set the campaign owner's address
    const title = 'My Campaign';
    const description = 'Campaign description';
    const target = ethers.utils.parseEther('1'); // Set the funding target
    const deadline = Math.floor(Date.now() / 1000) + 3600; // Set the deadline to 1 hour from now
    const image = 'campaign.jpg';

    const tx = await crowdFunding.createCampaign(
      owner,
      title,
      description,
      target,
      deadline,
      image
    );
  });

  it('should create a campaign', async function () {
    const campaigns = await crowdFunding.getCampaigns();
    expect(campaigns.length).to.equal(1); // Assuming this is the first campaign created
  });

  it('should donate to a campaign', async function () {
    const campaignId = 0;
    const donationAmount = ethers.utils.parseEther('0.1'); // Set the donation amount

    // Make a donation to the campaign
    await crowdFunding.donateToCampaign(campaignId, { value: donationAmount });
    const campaign = await crowdFunding.campaigns(campaignId);
    expect(campaign.amountCollected.toString()).to.equal(
      donationAmount.toString()
    );
  });

  it('should close a campaign and issue refunds', async function () {
    const owner = account1.address; // Set the campaign owner's address
    const title = 'My Campaign';
    const description = 'Campaign description';
    const target = ethers.utils.parseEther('1'); // Set the funding target
    const deadline = Math.floor(Date.now() / 1000) + 60;
    const image = 'campaign.jpg';

    const tx = await crowdFunding.createCampaign(
      owner,
      title,
      description,
      target,
      deadline,
      image
    );
    const campaignId = 0;
    const donationAmount = ethers.utils.parseEther('0.1'); // Set the donation amount

    await crowdFunding.donateToCampaign(campaignId, { value: donationAmount });
    const campaign = await crowdFunding.campaigns(campaignId);

    expect(campaign.isActive).to.be.true;
    expect(campaign.isCompleted).to.be.false;

    // Close the campaign
    setTimeout(async () => {
      await crowdFunding.closeCampaign(campaignId);
      expect(campaign.isActive).to.be.false;
    }, 1500);

    // Refund donations
    setTimeout(async () => {
      await crowdFunding.refundToDonators(campaignId);
      expect(campaign.isActive).to.be.false;
      expect(campaign.isCompleted).to.be.true;
      // // Verify that all donations have been refunded
      const donators = await crowdFunding.getDonators(campaignId);
      expect(donators[0]).to.be.empty;
      expect(donators[1]).to.be.empty;
    }, 2000);
  });
});
