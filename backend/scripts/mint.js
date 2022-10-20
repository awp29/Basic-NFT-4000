const { ethers } = require('hardhat');

async function mint() {
  const basicNft = await ethers.getContract('BasicNFT');

  console.log('---------------------------------------');
  console.log('Minting NFT...');

  const mintTx = await basicNft.mintNFT('blah/tokenURI');
  const mintTxReceipt = await mintTx.wait(1);
  console.log(
    `Minted tokenId ${mintTxReceipt.events[0].args.tokenId.toString()} from contract: ${
      basicNft.address
    }`
  );

  console.log('---------------------------------------');
}

mint()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
