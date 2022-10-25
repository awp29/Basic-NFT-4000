/** @jsxImportSource @emotion/react */
import { ethers } from 'ethers';
import networkMapping from './constants/networkMapping.json';
import abi from './constants/abi.json';
import { useEffect, useState } from 'react';
import { provider, signer } from './setup';
import { Nav, AppTitle } from './components/navbar';
import BannerImg from './components/BannerImg';
import {
  Author,
  Avatar,
  CollectionDetails,
  CollectionTitle,
  Header,
  HeaderContent,
} from './components/header';

const GOERLI_CHAIN_ID = 5;

function App() {
  const [listedNFTs, setListedNFTs] = useState([]);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    const fetchInitalData = async () => {
      try {
        const network = await provider.getNetwork();
        setChainId(network.chainId);

        if (!isChainSupported(network.chainId)) return;

        console.log('network', network);

        const listedItemFilter = getContract(network.chainId).filters.ListedItem();
        const listedItemLogs = await provider.getLogs({
          fromBlock: 0,
          toBlock: 'latest',
          ...listedItemFilter,
        });

        console.log('basicNFTMintedLogs', listedItemLogs);

        const contractInterface = new ethers.utils.Interface(abi);
        const listedNFTs = [];

        const promises = listedItemLogs.map(async (log) => {
          const parsedLog = contractInterface.parseLog(log);
          const tokenUri = stripIPFSPrefix(parsedLog.args.tokenUri);

          const nftMetaData = await (
            await fetch(`https://nftstorage.link/ipfs/${tokenUri}`)
          ).json();

          const imageUrl = stripIPFSPrefix(nftMetaData.image);

          listedNFTs.push({
            owner: parsedLog.args.seller,
            nftAddress: parsedLog.args.nftAddress,
            tokenId: parseInt(parsedLog.args.tokenId),
            tokenUri,
            image: `https://nftstorage.link/ipfs/${imageUrl}`,
          });
        });

        await Promise.all(promises);

        setListedNFTs(listedNFTs);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitalData();
  }, []);

  console.log('chainId', chainId);
  if (!isChainSupported(chainId)) {
    return <div>Chain is not supported please switch to Goerli</div>;
  }

  return (
    <div>
      <Nav>
        <AppTitle />
      </Nav>

      <BannerImg />

      <Header>
        <Avatar />
        <HeaderContent>
          <CollectionTitle />
          <Author />
          <CollectionDetails />
        </HeaderContent>
      </Header>

      <h1 css={{ marginTop: '120px' }}>LISTED NFTS: {listedNFTs.length}</h1>
    </div>
  );
}

export default App;

function getContract(chainId) {
  return new ethers.Contract(networkMapping[chainId], abi, signer);
}

function isChainSupported(chainId) {
  return chainId === GOERLI_CHAIN_ID || chainId === 31337;
}

function stripIPFSPrefix(ipfsUrl) {
  return ipfsUrl.substring(7);
}
