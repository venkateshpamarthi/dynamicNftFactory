const Web3 = require('web3');
require('dotenv').config();

const dynamicNft = require('./build/contracts/dynamicNft.json');
const goerliURL = process.env.goerliURL; 

const web3 = new Web3(goerliURL);
const dynamicNftAddress = process.env.dynamicNftAddress;
const ownerAddress = process.env.ownerAddress;
const privatekey = process.env.privatekey;


const tokenURI = ['child.json', 'teen.json', 'adult.json']

//create contract instance
const dynamicNftContract = new web3.eth.Contract(dynamicNft.abi,dynamicNftAddress);

//safeMint
async function safeMint(to,uri){
    const networkId = 5;
    const tx = dynamicNftContract.methods.safeMint(to,uri);
    const gas = await tx.estimateGas({from: ownerAddress});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI(); 
    const signature = await web3.eth.accounts.signTransaction(
        {
          to: dynamicNftContract.options.address, 
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

async function updateTokenURI(tokenId,uri){
   

    const networkId = 5;
    const tx = dynamicNftContract.methods.updateTokenURI(tokenId,uri);
    const gas = await tx.estimateGas({from: ownerAddress});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI(); 
    const signature = await web3.eth.accounts.signTransaction(
        {
          to: dynamicNftContract.options.address, 
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
async function gettokenURI(tokenId){
    const uri = await dynamicNftContract.methods.tokenURI(tokenId).call();
    console.log(uri);
}

safeMint(ownerAddress,tokenURI[0])

//gettokenURI(0)

//updateTokenURI(0,tokenURI[1])



