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
  NFTItemSoldBanner,
} from './components/NFTItem';
import { shortenAddress } from './utils/shortenAddress';
import { NetworkNotSupportedError } from './components';
import { useMetaMask, useFetchNFTs } from './hooks';

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
  const { fetchingNFTs, nfts } = useFetchNFTs(basicNFTMarketplaceContract, provider);

  const isNetworkSuported = connectedChain === ACTIVE_CHAIN_ID;

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

        {fetchingNFTs && <h1>LOADING....</h1>}

        {!fetchingNFTs && (
          <NFTGrid>
            {nfts.map((nft) => {
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

                  {!nft.bought && (
                    <NFTItemBuyButton
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('click');
                      }}
                    />
                  )}

                  {nft.bought && <NFTItemSoldBanner />}
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
