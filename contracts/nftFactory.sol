// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./dynamicNft.sol";

contract nftFactory {

    address public owner;
    uint public contractCount = 0;

    mapping(uint => address) public contracts;

    constructor() {
        owner = msg.sender;
    }

    // Modifier to check if the caller is the owner

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }
    // Event that is emitted when a new ERC721 contract is created
    event ContractCreated(address indexed newContract, string name, string symbol);

    // Create a new ERC721 contract with the given name and symbol
    // To create new ERC721 ,we need to pass name,symbol and baseURI
    function createERC721(string memory _name, string memory _symbol,string memory baseURI_) public onlyOwner returns (address) {
        ERC721 newContract = new dynamicNft(_name, _symbol, baseURI_);
        
        contractCount++;
        contracts[contractCount] = address(newContract);
        emit ContractCreated(address(newContract), _name, _symbol);
        return address(newContract);
    }

    // Get the address of the ERC721 contract at the given index
    function getContractAddress(uint _index) public view returns (address) {
        return contracts[_index];
    }
}