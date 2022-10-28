const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log('Deploying BasicNFTMarketplace ------------------------');

  const args = [];
  const basicNFTMarketplace = await deploy('BasicNFTMarketplace', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log('Verifying...');
    await verify(basicNFTMarketplace.address, args);
  }

  log('Deployed BasicNFTMarketplace -------------------------');
};

module.exports.tags = ['all', 'basicnft'];
