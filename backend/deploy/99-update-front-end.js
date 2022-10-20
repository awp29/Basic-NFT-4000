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
  const basicNFT = await ethers.getContract('BasicNFT');
  fs.writeFileSync(FRONT_END_ABI_FILE, basicNFT.interface.format(ethers.utils.FormatTypes.json));
}

async function updateContractAddresses() {
  const chainId = network.config.chainId.toString();
  const basicNFT = await ethers.getContract('BasicNFT');
  const contractAddresses = JSON.parse(fs.readFileSync(NETWORK_MAPPING_FILE, 'utf-8'));

  contractAddresses[chainId] = basicNFT.address;

  fs.writeFileSync(NETWORK_MAPPING_FILE, JSON.stringify(contractAddresses));
}

module.exports.tags = ['all', 'frontend'];
