// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';

error NotOwner();
error NotApprovedForMarketplace();
error NotListed(address nftAddres, uint256 tokenId);
error PriceNotMet(address nftAddress, uint256 tokenId, uint256 price);
error NoProceeds();

contract BasicNFTMarketplace is ReentrancyGuard {
  struct Listing {
    address seller;
    uint256 price;
  }

  event ListedItem(
    address indexed seller,
    address indexed nftAddress,
    uint256 indexed tokenId,
    string tokenUri,
    uint256 price
  );

  event ItemBought(
    address indexed buyer,
    address indexed nftAddress,
    uint256 indexed tokenId,
    uint256 price
  );

  // s_listings[sellerAddress][tokenId] returns Listing
  mapping(address => mapping(uint256 => Listing)) private s_listings;
  mapping(address => uint256) private s_proceeds;

  modifier isOwnerOfNFT(
    address nftAddress,
    uint256 tokenId,
    address spender
  ) {
    IERC721 nft = IERC721(nftAddress);
    address owner = nft.ownerOf(tokenId);
    if (spender != owner) {
      revert NotOwner();
    }
    _;
  }

  modifier isListed(address nftAddress, uint256 tokenId) {
    Listing memory listing = s_listings[nftAddress][tokenId];
    if (listing.price <= 0) {
      revert NotListed(nftAddress, tokenId);
    }
    _;
  }

  function listItem(
    address nftAddress,
    uint256 tokenId,
    string memory tokenUri
  ) external isOwnerOfNFT(nftAddress, tokenId, msg.sender) {
    IERC721 nft = IERC721(nftAddress);
    if (nft.getApproved(tokenId) != address(this)) {
      revert NotApprovedForMarketplace();
    }

    s_listings[nftAddress][tokenId] = Listing(msg.sender, 100000000000000000); // 0.1 ETH
    emit ListedItem(msg.sender, nftAddress, tokenId, tokenUri, 100000000000000000);
  }

  function buyItem(address nftAddress, uint256 tokenId)
    external
    payable
    isListed(nftAddress, tokenId)
    nonReentrant
  {
    Listing memory listedItem = s_listings[nftAddress][tokenId];
    if (msg.value < listedItem.price) {
      revert PriceNotMet(nftAddress, tokenId, listedItem.price);
    }

    s_proceeds[listedItem.seller] += msg.value;

    IERC721(nftAddress).safeTransferFrom(listedItem.seller, msg.sender, tokenId);
    emit ItemBought(msg.sender, nftAddress, tokenId, listedItem.price);
  }

  function withdrawProceeds() external {
    uint256 proceeds = s_proceeds[msg.sender];
    if (proceeds <= 0) {
      revert NoProceeds();
    }
    s_proceeds[msg.sender] = 0;
    (bool success, ) = payable(msg.sender).call{value: proceeds}('');
    require(success, 'Transfer failed');
  }

  function getListing(address nftAddress, uint256 tokenId) external view returns (Listing memory) {
    return s_listings[nftAddress][tokenId];
  }

  function getProceeds(address seller) external view returns (uint256) {
    return s_proceeds[seller];
  }
}
