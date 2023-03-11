
const nftFactory = artifacts.require('nftFactory')

module.exports = function(deployer){
    
    deployer.deploy(nftFactory)
}