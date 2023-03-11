// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract dynamicNft is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
   
   //Defining Roles for this Nft
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    Counters.Counter private _tokenIdCounter;
   
    string private setBaseURI;

    constructor(string memory _name,string memory _symbol,string memory baseURI_) ERC721(_name,_symbol) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _setupRole(OWNER_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        setBaseURI = baseURI_;
    }

    function _baseURI() internal view override returns (string memory) {
        return setBaseURI;
    } 

    function transferOwnership(address newOwner) public onlyRole(OWNER_ROLE) {
        require(newOwner != address(0), "ERC721: new owner is zero address");
        grantRole(OWNER_ROLE, newOwner);
        revokeRole(OWNER_ROLE, msg.sender);
    }

    function addAdmin(address account) public onlyRole(OWNER_ROLE) {
        grantRole(ADMIN_ROLE, account);
    }

    function removeAdmin(address account) public onlyRole(OWNER_ROLE) {
        revokeRole(ADMIN_ROLE, account);
    }

    function addMinter(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(MINTER_ROLE, account);
    }

    function removeMinter(address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, account);
    }

    function safeMint(address to, string memory uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
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

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Upgrade tokenURI to make this Nft Dynamic
    function updateTokenURI(uint256 tokenId, string memory uri) public {
        require(ownerOf(tokenId) == _msgSender(), "ERC721: transfer caller is not owner nor approved");
        _setTokenURI(tokenId, uri);
    } 
}