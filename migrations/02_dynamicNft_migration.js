const base_URI = "https://ipfs.io/ipfs/QmYQ9rsWAVFEv4CQB5mqUYjK9WV577dsSMTdELfw9eUy8a/lifeCycle_MetaData/"
const dynamicNft = artifacts.require('dynamicNft')
const name = "LifeCycle"
const symbol = "LC"

module.exports = function(deployer){

    deployer.deploy(dynamicNft,name,symbol,base_URI)
}