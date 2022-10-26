const { ethers } = require('hardhat');

async function buyNFT() {
  const signer = await ethers.getSigner('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
  const basicNFTMarketplace = await ethers.getContract('BasicNFTMarketplace', signer);

  console.log('--------------------------------------------');
  console.log('Buying NFT..........');

  const transaction = await basicNFTMarketplace.buyItem(
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    0,
    {
      value: ethers.utils.parseEther('1'),
    }
  );

  await transaction.wait();

  console.log('Bought NFT!!!!');
  console.log('--------------------------------------------');
}

buyNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
