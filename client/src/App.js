/** @jsxImportSource @emotion/react */
import { ethers } from 'ethers';
import networkMapping from './constants/networkMapping.json';
import abi from './constants/abi.json';
import { useEffect, useState } from 'react';
import { provider, signer } from './setup';

const GOERLI_CHAIN_ID = 5;

function App() {
  const [numberOfMintedNFTs, setNumberOfMintedNFTs] = useState(0);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    const fetchInitalData = async () => {
      try {
        const network = await provider.getNetwork();
        setChainId(network.chainId);

        if (!isChainSupported(network.chainId)) return;

        console.log('network', network);

        const basicNFTMintedFilter = getContract(network.chainId);
        const basicNFTMintedLogs = await provider.getLogs({
          fromBlock: 0,
          toBlock: 'latest',
          ...basicNFTMintedFilter,
        });

        console.log('basicNFTMintedLogs', basicNFTMintedLogs);

        setNumberOfMintedNFTs(basicNFTMintedLogs.length);
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
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>BASIC NFT 4000!!!!!!</h1>
      <p css={{ fontSize: '32px' }}>{numberOfMintedNFTs} BasicNFTs minted</p>
      <p css={{ fontSize: '32px' }}>ChainId {chainId}</p>
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
