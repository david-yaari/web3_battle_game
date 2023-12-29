import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

module.exports = {
  solidity: {
    version: '0.8.16',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    sepolia: {
      url: `${process.env.SEPOLIA_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
