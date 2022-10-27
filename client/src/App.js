/** @jsxImportSource @emotion/react */

import { ethers } from 'ethers';
import networkMapping from './constants/networkMapping.json';
import abi from './constants/abi.json';
import { Nav, AppTitle, NavContent } from './components/navbar';
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
import {
  NetworkNotSupportedError,
  ConnectWalletButton,
  WalletConnected,
  Loader,
} from './components';
import { useMetaMask, useFetchNFTs, useScreenWidth } from './hooks';
import MobileShoppingCartModal from './components/modal/MobileShoppingCartModal';
import DesktopShoppingCartModal from './components/modal/DesktopShoppingCartModal';
import { useState } from 'react';
import { getSupportChainId } from './utils/supportedNetwork';

const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum, 'any');

function App() {
  const { connectedToMetaMask, connectToMetaMask, connectedAccount, connectedChain } =
    useMetaMask();
  const { fetchingNFTs, nftMap, updateNFT } = useFetchNFTs();

  const [itemToBuy, setItemToBuy] = useState(null);
  const screenWidth = useScreenWidth();

  const isNetworkSuported = connectedChain == 5 || connectedChain == 31337;

  const showCart = !!itemToBuy;
  const showMobileCart = screenWidth < 1024;
  const nfts = Object.values(nftMap);

  const handleBuyNFT = async (nftAddress, tokenId) => {
    try {
      if (!connectedToMetaMask) {
        await connectToMetaMask();
      }

      const supportedChainId = getSupportChainId();
      const signer = provider.getSigner();

      const marketplaceContract = new ethers.Contract(
        networkMapping[supportedChainId],
        abi,
        signer
      );

      const transaction = await marketplaceContract.connect(signer).buyItem(nftAddress, tokenId, {
        value: ethers.utils.parseEther('0.1'),
      });

      const receipt = await transaction.wait();

      const updatedNFT = {
        ...nftMap[tokenId],
        owner: receipt.from,
        bought: true,
      };

      updateNFT(updatedNFT);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div>
      {connectedChain && !isNetworkSuported && <NetworkNotSupportedError />}

      <Nav>
        <NavContent>
          <AppTitle />

          {!connectedAccount && (
            <ConnectWalletButton onClick={connectToMetaMask}>connect</ConnectWalletButton>
          )}

          {connectedAccount && <WalletConnected connectedAccount={connectedAccount} />}
        </NavContent>
      </Nav>

      <div css={{ marginTop: '72px' }}>
        <BannerImg />

        <Header>
          <Avatar />
          <HeaderContent>
            <CollectionTitle />
            <Author />
            <CollectionDetails />
          </HeaderContent>
        </Header>

        <div css={{ maxWidth: '1280px', margin: 'auto' }}>
          {fetchingNFTs && (
            <div css={{ marginTop: '180px' }}>
              <Loader />
            </div>
          )}

          {!fetchingNFTs && (
            <NFTGrid>
              {nfts.map((nft) => {
                return (
                  <NFTItem
                    key={nft.tokenId}
                    hasSold={false}
                    onClick={() => {
                      setItemToBuy(nft);
                    }}
                  >
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
                          setItemToBuy(nft);
                        }}
                      />
                    )}

                    {nft.bought && <NFTItemSoldBanner />}
                  </NFTItem>
                );
              })}
            </NFTGrid>
          )}

          {showCart && !showMobileCart && (
            <DesktopShoppingCartModal
              itemToBuy={itemToBuy}
              onBuy={handleBuyNFT}
              onClose={() => {
                setItemToBuy(null);
              }}
            />
          )}

          {showCart && showMobileCart && (
            <MobileShoppingCartModal
              itemToBuy={itemToBuy}
              onBuy={handleBuyNFT}
              onClose={() => {
                setItemToBuy(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
