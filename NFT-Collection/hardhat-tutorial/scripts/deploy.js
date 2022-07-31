const {ethers} = require("hardhat");
require("dotenv").config({path:".env"});
const {WHITELIST_CONTRACT_ADDRESS, METADATA_URL} = require("../constants");

async function main() {
  //Address of the whitelist constract deployed in the previous module (Whitelist_Dapp)
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
  //URL from where we can extract the metadata for a Legacy Dev NFT
  const metadataURL = METADATA_URL;

  /**A ContractFactory in ethers.js is an abstraction used to deploy new smarts contracts, 
   * so LegacyDevContracts here is a factory for instaces of our LegacyDevs contract */
  const legacyDevsContract = await ethers.getContractFactory("LegacyDevs");

  //deploy the contract
  const deployedLegacyDevsContract = await legacyDevsContract.deploy(
    metadataURL,
    whitelistContract
  );

  //print the address of the deployed contract
  console.log(
    "Legacy Devs Contract Address", deployedLegacyDevsContract.address);
}

//Call the main function and catch if there is any error
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});