
 require("@nomiclabs/hardhat-waffle");

 /**
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
*/

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//To read from the env file...
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",

  networks: {
    rinkeby: {
      //How do we define which test network to deploy to?
      url: process.env.ALCHEMY_API_KEY_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    /** 
     * This can also be applied to other test/main nets such as BSC, Rupsten, etc.
     * Simply get the URL and private key of your wallet . e.g.
     *   rupsten: {
     *     //How do we define which test network to deploy to?
     *     url: process.env.ALCHEMY_API_KEY_URL,
     *     accounts: [process.env.PRIVATE_KEY]
          },
    */
    
  },
};
