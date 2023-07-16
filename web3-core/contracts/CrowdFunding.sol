// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        bool isActive;
        bool isCompleted;
        bool isExpired;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(
            _deadline > block.timestamp,
            'The deadline should be a date in the future.'
        );

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.isActive = true;
        campaign.isCompleted = false;
        campaign.isExpired = false;

        numberOfCampaigns++;

        // Return the index (id) of the latest campaign
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(campaigns[_id].isActive, 'Campaign is not active.');
        require(
            !campaigns[_id].isCompleted,
            'Campaign has already been completed.'
        );
        require(!campaigns[_id].isExpired, 'Campaign has expired.');

        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}('');

        if (sent) {
            campaign.amountCollected += amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

    function closeCampaign(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(
            campaign.owner == msg.sender,
            'Only the campaign owner can close the campaign.'
        );

        if (campaign.amountCollected >= campaign.target) {
            campaign.isCompleted = true;
        } else if (campaign.deadline < block.timestamp) {
            campaign.isExpired = true;
        }
        campaign.isActive = false;
    }

    function refundToDonators(uint256 _id) public {
        Campaign storage campaign = campaigns[_id];
        require(
            !campaign.isCompleted && campaign.isExpired && !campaign.isActive,
            'Campaign must be closed, expired, and incomplete to issue refunds.'
        );

        for (uint256 i = 0; i < campaign.donators.length; i++) {
            (bool sent, ) = payable(campaign.donators[i]).call{
                value: campaign.donations[i]
            }('');
            require(sent, 'Failed to refund to donator.');
        }
        campaign.isCompleted = true;
    }
}
