const SimpleStorage = artifacts.require("SimpleStorage");
const Tether = artifacts.require("Tether");
const RWD  = artifacts.require("RWD");
const DecentralBank = artifacts.require("DecentralBank");


module.exports = async function (deployer,network,accounts) {
  // Deploy Mock Tether Token
  // await deployer.deploy(Tether);
  // const tether = await Tether.deployed();

 await deployer.deploy(SimpleStorage);
 
 //deploy mock tether contract
 await deployer.deploy(Tether);
 const tether = await Tether.deployed();
 
 //deploy rwd contract
 await deployer.deploy(RWD);
 const rwd = await RWD.deployed();
 
 //deploy decentralbamk contract
 await deployer.deploy(DecentralBank,rwd.address,tether.address);
 const decentralBank = await DecentralBank.deployed();

 //Transfer all RWD tokens to decentral bank
 await rwd.transfer(decentralBank.address, "1000000000000000000000000");

 //distribute 100 tether tokens to investor
 await tether.transfer(accounts[1], "1000000000000000000");




  
};
