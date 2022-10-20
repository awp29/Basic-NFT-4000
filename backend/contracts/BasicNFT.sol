// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract BasicNFT is ERC721, ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  event BasicNFTMinted(uint256 indexed tokenId, string indexed tokenUri);

  constructor() ERC721('BasicNFT', 'BNFT') {}

  function mintNFT(string memory uri) public returns (uint256) {
    uint256 tokenId = _tokenIdCounter.current();
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);

    emit BasicNFTMinted(tokenId, uri);

    _tokenIdCounter.increment();

    return tokenId;
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
  {
    return super.tokenURI(tokenId);
  }
}
