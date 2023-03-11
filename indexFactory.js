

const Web3 = require('web3');
const nftFactory = require('./build/contracts/nftFactory.json');
require('dotenv').config();

const goerliURL = process.env.goerliURL; 
const web3 = new Web3(goerliURL);

const nftFactoryAddress = process.env.nftFactoryAddress;
const ownerAddress = process.env.ownerAddress;
const privatekey = process.env.privatekey;

const baseURI = 'https://ipfs.io/ipfs/QmYQ9rsWAVFEv4CQB5mqUYjK9WV577dsSMTdELfw9eUy8a/lifeCycle_MetaData/';


// create contract instance
const nftFactoryContract = new web3.eth.Contract(nftFactory.abi, nftFactoryAddress);




async function deployNFT(name, symbol, baseURI) { 
    
    const networkId = 5;
    
    const tx = nftFactoryContract.methods.createERC721(name, symbol, baseURI);
    const gas = await tx.estimateGas({from: ownerAddress});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI(); 
  
    const signature = await web3.eth.accounts.signTransaction(
      {
        to: nftFactoryContract.options.address, 
        data,
        gas,
        gasPrice, 
        chainId: networkId
      },
      privatekey
    );

    let receipt = await web3.eth.sendSignedTransaction(signature.rawTransaction) 
    console.log({txhash : receipt.transactionHash}) 

}

async function getContractsCount() {
    const count = await nftFactoryContract.methods.contractCount().call();
    console.log('count :', count);
}

async function getContractAddress(index) {
    const address = await nftFactoryContract.methods.getContractAddress(index).call();
    console.log('address :', address);
}
 
deployNFT('LifeCycleNFT', 'LCNFT', baseURI);
//getContractsCount();
//getContractAddress(1); 


