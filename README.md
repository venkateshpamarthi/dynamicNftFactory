# dynamicNftFactory

There are two contracts involved in this project

1.nftFactory(verified and published address:0xA16C7bdDD42B79b4cff39AB656aDdd37baC8595B)

2.dynamicNft(verified and published address:0x5138d54bc12dd7CA2439B941B6e031BA4895226F)

You can even deploy your own NFT using this code(because baseURI is not fixed inside the code,rather it is passed through constructor) And test it with your
baseURI.

Both the contracts are published and verified on #Etherscan (goerli) Network

These smart contracts are using @openzeppelin/contracts and functions are gas optimised.

# nftFactory:

A factory contract is a contract through which we can create multiple smart contract instances.In this case nftFactory contract can deploy 
multiple dynamicNft's.

We can pass Name,Symbol and baseURI  in this contract through a function called createERC721 to create new dynamicNft instance.
And that number of contracts deployed count is stored in 'ContractCount' which is incremented whenever a new instance is deployed.And the count is 
mapped to newly generated contract address through a mapping called 'contracts'.Whenever we want to know the contract address of specific count
 we can get through a function called 'getContractAddress'.

# dynamicNft:

In this smartContract there is function defined called 'updateTokenURI',that can be used to change the metadata of Specific 
TokenId that is already minted.This functionality makes a dynamic Nft, where you can  change metadata.

The metadata is hosted on IPFS (Inter Planetary File System).
BaseURI that used to deploy dynamicNft contract is "https://ipfs.io/ipfs/QmYQ9rsWAVFEv4CQB5mqUYjK9WV577dsSMTdELfw9eUy8a/lifeCycle_MetaData/" (on etherscan).


TokenURI's that can be used to mint this deployed contract are "child.json","teen.json","adult.json"(we can use anyone tokenURI to mint Nft and change
metadata through 'updateTokenURI' function).

And you can find your Nft's in testnet opensea marketplace after minting through "https://testnets.opensea.io/assets/goerli/<(contractAddress)>/<(tokenId)>".
Whenever you call 'updateTokenURI' function, the opensea testnet also updates with new metadata after few minutes by clicking refresh metadata option.

This dynamicNft contract is defined with different Roles (OWNER_ROLE,ADMIN_ROLE,MINTER_ROLE). Where OWNER_ROLE can addAdmin,removeAdmin.
ADMIN_ROLE can addMinter,removeMinter. MINTER_ROLE can safeMint.All are initially given as msg.sender as owner can be accessible to every functionality.

# NodeJS Scripts 

There are two NodeJS scripts are written in the project.

1.indexFactory.js

2.indexDnft.js

# indexFactory.js

If you run this script:- 
Required calling functions are commented out at the bottom,we can according to our requirement

It will deploy a Nft contract through Factory contract.It will be deployed with given parameters inside the script.

It will increment and get count of contract through getContractCount() 

It will get address of the deployed Nft contract through getContractAddress()

# indexDnft.js

If you run this script:-
Required calling functions are commented out at the bottom,we can use according to our requirement.

It will mint a dynamicNft through safeMint() [#token is minted on basis of deployed dynamicNft contract's parameters(name,symbol,BaseURI)].

It will update the URI of specific tokenId through updateTokenURI()

It will also give tokenURI through getTokenURI()

use one function at a time ,so that they will work in correct oder according to our requirment. 

# Main Packages Used:

@openzeppelin/contracts through command "npm i --save @openzeppelin/contracts".

@truffle/hdwallet-provider through "npm i @truffle/hdwallet-provider" to connect with goerli network.

truffle-plugin-verify through "npm install -D truffle-plugin-verify" to publish and verify on etherscan.

used WEB3 for NodeJS scripts: "npm i web3"

used DOTENV : "npm i dotenv"

# dotenv

create dotenv file and insert values as .env.example file and run.
used infura api key, secret phrase of metamask to deploy in goerli network with hd-wallet provider


