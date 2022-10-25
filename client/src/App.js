/** @jsxImportSource @emotion/react */
import { ethers } from 'ethers';
import networkMapping from './constants/networkMapping.json';
import abi from './constants/abi.json';
import { useEffect, useState } from 'react';
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
import { NFTGrid } from './components/NFTGrid';
import {
  NFTItem,
  NFTItemBuyButton,
  NFTItemDetail,
  NFTItemDetailContent,
  NFTItemImage,
  NFTItemName,
  NFTItemRow,
} from './components/NFTItem';
import { shortenAddress } from './utils/shortenAddress';
import { NetworkNotSupportedError } from './components';
import { useMetaMask } from './hooks/useMetaMask';

const ACTIVE_CHAIN_ID = process.env.REACT_APP_CHAIN_ID;

const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
const signer = provider.getSigner();

const basicNFTMarketplaceContract = new ethers.Contract(
  networkMapping[ACTIVE_CHAIN_ID],
  abi,
  signer
);

function App() {
  const { connectToMetaMask, connectedAccount, connectedChain } = useMetaMask();

  const [listedNFTs, setListedNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('connectedChain', connectedChain);
  console.log('ACTIVE_CHAIN_ID', ACTIVE_CHAIN_ID);
  const isNetworkSuported = connectedChain === ACTIVE_CHAIN_ID;

  useEffect(() => {
    const fetchInitalData = async () => {
      try {
        const listedItemFilter = basicNFTMarketplaceContract.filters.ListedItem();
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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchInitalData();
  }, []);

  return (
    <div>
      {connectedChain && !isNetworkSuported && <NetworkNotSupportedError />}

      <Nav>
        <AppTitle />
        {!connectedAccount && <button onClick={connectToMetaMask}>connect</button>}
        {connectedAccount && <p>{shortenAddress(connectedAccount)}</p>}
      </Nav>

      <div css={{ marginTop: '68px' }}>
        <BannerImg />

        <Header>
          <Avatar />
          <HeaderContent>
            <CollectionTitle />
            <Author />
            <CollectionDetails />
          </HeaderContent>
        </Header>

        {loading && <h1>LOADING....</h1>}

        {!loading && (
          <NFTGrid>
            {listedNFTs.map((nft) => {
              return (
                <NFTItem key={nft.tokenId} hasSold={false}>
                  <div css={{ padding: '16px' }}>
                    <NFTItemImage src={nft.image} />
                    <NFTItemName>CRYPTO PENGUIN #{nft.tokenId}</NFTItemName>
                    <NFTItemRow>
                      <NFTItemDetail>Price</NFTItemDetail>
                      <NFTItemDetailContent>0.1 ETH</NFTItemDetailContent>
                    </NFTItemRow>
                    <NFTItemRow>
                      <NFTItemDetail>Owner</NFTItemDetail>
                      <NFTItemDetailContent title={nft.owner}>
                        {shortenAddress(nft.owner)}
                      </NFTItemDetailContent>
                    </NFTItemRow>
                  </div>

                  <NFTItemBuyButton
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('click');
                    }}
                  />
                </NFTItem>
              );
            })}
          </NFTGrid>
        )}
      </div>
    </div>
  );
}

export default App;

function stripIPFSPrefix(ipfsUrl) {
  return ipfsUrl.substring(7);
}
