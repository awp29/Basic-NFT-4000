import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../constants/abi.json';

export const useFetchNFTs = (basicNFTMarketplaceContract, provider) => {
  const [fetchingNFTs, setFetchingNFTs] = useState(true);
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const listedItemFilter = basicNFTMarketplaceContract.filters.ListedItem();
        const boughtItemFilter = basicNFTMarketplaceContract.filters.ItemBought();

        const marketplaceLogs = await provider.getLogs({
          fromBlock: 0,
          toBlock: 'latest',
          address: basicNFTMarketplaceContract.address,
          topics: [[...listedItemFilter.topics, ...boughtItemFilter.topics]],
        });

        const listedItemLogs = filterOutListedItemLogs(marketplaceLogs);
        const nftMap = mapListedItemLogsToNFTs(listedItemLogs);

        const boughtItemLogs = filterOutBoughtItemLogs(marketplaceLogs);
        const nftMapWithBoughtFlag = markNFTsAsBought(nftMap, boughtItemLogs);

        const nftMapWithImages = await fetchNFTImages(nftMapWithBoughtFlag);
        const nftArray = Object.values(nftMapWithImages);

        setFetchingNFTs(false);
        setNFTs(nftArray);
      } catch (error) {
        console.log(error);
        setFetchingNFTs(false);
      }
    };

    fetchNFTs();
  }, []);

  return {
    fetchingNFTs,
    nfts,
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
