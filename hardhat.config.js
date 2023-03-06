require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        runs: 200,
        enabled: true
      }
    }
  },
};
