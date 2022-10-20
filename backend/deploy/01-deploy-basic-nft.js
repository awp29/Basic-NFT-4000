module.exports = async (hre) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log('Deploying BasicNFT ------------------------');

  const args = [];
  await deploy('BasicNFT', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  });

  log('Deployed BasicNFT -------------------------');
};

module.exports.tags = ['all', 'basicnft'];
