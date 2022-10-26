import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../constants/abi.json';
import networkMapping from '../constants/networkMapping.json';

export const useFetchNFTs = (chainId) => {
  const [fetchingNFTs, setFetchingNFTs] = useState(true);
  const [nftMap, setNFTMap] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        // const providerUrl = getProviderURL(chainId);
        // const supportedChainId = getSupportedChainId(chainId);
        const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
        const marketplaceContract = new ethers.Contract(networkMapping[31337], abi);

        const listedItemFilter = marketplaceContract.filters.ListedItem();
        const boughtItemFilter = marketplaceContract.filters.ItemBought();

        const marketplaceLogs = await provider.getLogs({
          fromBlock: 0,
          toBlock: 'latest',
          address: marketplaceContract.address,
          topics: [[...listedItemFilter.topics, ...boughtItemFilter.topics]],
        });

        const listedItemLogs = filterOutListedItemLogs(marketplaceLogs);
        const nftMap = mapListedItemLogsToNFTs(listedItemLogs);

        const boughtItemLogs = filterOutBoughtItemLogs(marketplaceLogs);
        const nftMapWithBoughtFlag = markNFTsAsBought(nftMap, boughtItemLogs);

        const nftMapWithImages = await fetchNFTImages(nftMapWithBoughtFlag);

        setFetchingNFTs(false);
        setNFTMap(nftMapWithImages);
      } catch (error) {
        console.log(error);
        setFetchingNFTs(false);
      }
    };

    fetchNFTs();
  }, [chainId]);

  const updateNFT = (nft) => {
    nftMap[nft.tokenId] = nft;
    setNFTMap({ ...nftMap });
  };

  return {
    fetchingNFTs,
    nftMap,
    updateNFT,
  };
};

const filterOutListedItemLogs = filterOutLogs('ListedItem');
const filterOutBoughtItemLogs = filterOutLogs('ItemBought');

function filterOutLogs(logName) {
  const contractInterface = new ethers.utils.Interface(abi);

  return function (logs) {
    return logs.filter((log) => {
      const parsedLog = contractInterface.parseLog(log);
      return parsedLog.name === logName;
    });
  };
}

function mapListedItemLogsToNFTs(listedItemLogs) {
  const nftMap = {};
  const contractInterface = new ethers.utils.Interface(abi);

  for (const log of listedItemLogs) {
    const parsedLog = contractInterface.parseLog(log);
    const tokenId = parseInt(parsedLog.args.tokenId);
    const tokenUri = stripIPFSPrefix(parsedLog.args.tokenUri);

    nftMap[tokenId] = {
      owner: parsedLog.args.seller,
      nftAddress: parsedLog.args.nftAddress,
      tokenId,
      tokenUri,
      bought: false,
    };
  }

  return nftMap;
}

function markNFTsAsBought(nfts, itemBoughtLogs) {
  const nftMap = Object.assign({}, nfts);
  const contractInterface = new ethers.utils.Interface(abi);

  for (const log of itemBoughtLogs) {
    const parsedLog = contractInterface.parseLog(log);
    const tokenId = parseInt(parsedLog.args.tokenId);

    nftMap[tokenId] = {
      ...nftMap[tokenId],
      owner: parsedLog.args.buyer,
      bought: true,
    };
  }

  return nftMap;
}

async function fetchNFTImages(nfts) {
  const nftMap = Object.assign({}, nfts);

  const promises = Object.values(nfts).map(async (nft) => {
    const nftMetaData = await (await fetch(`https://nftstorage.link/ipfs/${nft.tokenUri}`)).json();
    const imageUrl = stripIPFSPrefix(nftMetaData.image);

    nftMap[nft.tokenId] = {
      ...nft,
      image: `https://nftstorage.link/ipfs/${imageUrl}`,
    };
  });

  await Promise.all(promises);

  return nftMap;
}

function stripIPFSPrefix(ipfsUrl) {
  return ipfsUrl.substring(7);
}

// function getProviderURL(chainId) {
//   if (chainId === '31337') {
//     return 'http://localhost:8545';
//   }
//   return 'https://goerli.infura.io/v3/6fa8980e7b7f47d281b7f5688c31663e';
// }

// function getSupportedChainId(chainId) {
//   console.log('getSupportedChainId', chainId);
//   if (chainId == 5 || chainId == 31337) {
//     console.log('return', chainId);
//     return chainId;
//   }
//   // DEFAULT TO GOERLI
//   return 5;
// }
