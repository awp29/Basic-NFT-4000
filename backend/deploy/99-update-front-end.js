const { ethers, network } = require('hardhat');
const fs = require('fs');

const FRONT_END_ABI_FILE = '../client/src/constants/abi.json';
const NETWORK_MAPPING_FILE = '../client/src/constants/networkMapping.json';

module.exports = async () => {
  console.log('Updating Front End...');
  await updateContractAddresses();
  await updateAbi();
  console.log('Front End Updated! ---------------------------');
};

async function updateAbi() {
  const basicNFTMarketplace = await ethers.getContract('BasicNFTMarketplace');
  fs.writeFileSync(
    FRONT_END_ABI_FILE,
    basicNFTMarketplace.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const chainId = network.config.chainId.toString();
  const basicNFTMarketplace = await ethers.getContract('BasicNFTMarketplace');
  const contractAddresses = JSON.parse(fs.readFileSync(NETWORK_MAPPING_FILE, 'utf-8'));

  contractAddresses[chainId] = basicNFTMarketplace.address;

  fs.writeFileSync(NETWORK_MAPPING_FILE, JSON.stringify(contractAddresses));
}

module.exports.tags = ['all', 'frontend'];
