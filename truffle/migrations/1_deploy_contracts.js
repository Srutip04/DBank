const SimpleStorage = artifacts.require("SimpleStorage");
const Tether = artifacts.require("Tether");


module.exports = async function (deployer) {
  // Deploy Mock Tether Token
  // await deployer.deploy(Tether);
  // const tether = await Tether.deployed();

 deployer.deploy(SimpleStorage);
 deployer.deploy(Tether);
  
};
