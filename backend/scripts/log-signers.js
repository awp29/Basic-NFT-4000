const { ethers } = require('hardhat');

async function logSigners() {
  const signers = await ethers.getSigners();

  for (const signer of signers) {
    console.log('address -', signer.address);
  }
}

logSigners()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
