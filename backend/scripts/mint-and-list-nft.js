const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
require('dotenv').config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;

const nftUrls = [
  // 'ipfs://bafyreift23cyvsgft72xamhdmbkhiymerj6icokzlqkfz27tzv6ivzfgme/metadata.json',
  // 'ipfs://bafyreibpyzmabftjeanwxubmeuqluep74ite4b6j4erpwtocrye4um7lta/metadata.json',
  // 'ipfs://bafyreiblqbpjmylwozqaqfwbo6su2a5ynuug35sphswjyh5l4feldvif2y/metadata.json',
  // 'ipfs://bafyreigunb2nqopjeghlsp53qrlhg44lut5dgzpbdfberbvtob6c5d5wwi/metadata.json',
  // 'ipfs://bafyreiemapw5pwdxb23em3jde3hhc7z4ikb26uihegfjvmoexop5der66a/metadata.json',
  // 'ipfs://bafyreic2bzj66x35rkhkmctnfcorv6az4v5i5s3sbvnpi7aomqdb6otbze/metadata.json',
  // 'ipfs://bafyreia5gz3dje4jpzzc7n4hdn3u54hetnz6fyh6fusjxpt43rrwpzb6lm/metadata.json',
  // 'ipfs://bafyreibogtymtebgxywjpmypn2lau2u42x5mrzf3balb3nveobd7lotny4/metadata.json',
  // 'ipfs://bafyreiak6urqkrxcff45qzdtlzjmmmzebpboayxh24wfwn6aej2u5djl7m/metadata.json',
  'ipfs://bafyreifg3y747h3xtgnjpdbvweakk2oi5cd4xztmzbuooomfc4w7frjeqy/metadata.json',
  // 'ipfs://bafyreicro3fvqdatmtsjtg7xb67ursyxuo2nrohflckvjksd4to3expdr4/metadata.json',
  // 'ipfs://bafyreiavt7s46rslkvl2jwyrns6cpalixxwp35cc6xd4hzryarwuvfjbvy/metadata.json',
  // 'ipfs://bafyreih4r3zzxqxkn3wni2tcguix4skvedoqa7ignpfdks74723s5rhizu/metadata.json',
  // 'ipfs://bafyreieazpylkdyn4dxid4fn57u6a4nd2oge7j3ugz2e3xc7cqwz6rscra/metadata.json',
  // 'ipfs://bafyreibtuewt4wxa5rp3pssnfhkhtdnyimr5qjma63lfdqamibscz5anau/metadata.json',
  // 'ipfs://bafyreid4xhhy67pruql7xeygck4ep3wo2gmbba23mbx6h74vg7wrkvlc4q/metadata.json',
  // 'ipfs://bafyreihsjudqlnqmlq75xm774sqbazyrn6fxychl72p44h5glgtec54w24/metadata.json',
  // 'ipfs://bafyreiez33lyc6j6mzmc5573vbsxdcn6fd6rajqkvvhkwokktovcimjdi4/metadata.json',
  // 'ipfs://bafyreidzglmuedjspg3dhukoyzjqzh2vlko5t76me274axlw53dmkmixhq/metadata.json',
  // 'ipfs://bafyreibvub2vdbftm2seib6vdtr3e5odpxoiiu4ysiahancyfi56uncduu/metadata.json',
];

async function mintAndList() {
  const basicNFTMarketplace = await ethers.getContract('BasicNFTMarketplace');
  const basicNFT = await ethers.getContract('BasicNFT');

  const alchemy = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
  const gasPrice = await alchemy.getGasPrice();

  console.log('gas price', ethers.utils.formatEther(gasPrice));

  for (const url of nftUrls) {
    console.log('Minting NFT...');

    const mintTx = await basicNFT.mintNFT(url, {
      gasPrice: gasPrice,
      // gasLimit: BigNumber.from('100000000000'),
    });

    const mintTxReceipt = await mintTx.wait(1);
    const tokenId = mintTxReceipt.events[0].args.tokenId;

    console.log('Approving NFT...');

    const approvalTx = await basicNFT.approve(basicNFTMarketplace.address, tokenId, {
      gasPrice: gasPrice,
      // gasLimit: BigNumber.from('100000000000'),
    });

    await approvalTx.wait(1);

    console.log('Listing NFT...');

    const tx = await basicNFTMarketplace.listItem(basicNFT.address, tokenId, url, {
      gasPrice: gasPrice,
      // gasLimit: BigNumber.from('100000000000'),
    });

    await tx.wait(1);

    console.log('NFT Listed!');
  }
}

mintAndList()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
