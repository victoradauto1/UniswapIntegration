import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "solidity-coverage";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.28" },
      { version: "0.7.6" },
    ],
  },
   networks: {
   amoy:{
      url: `${process.env.RPC_URL}`,
      chainId: parseInt(`${process.env.CHAIN_ID}`),
      accounts:{
        mnemonic:`${process.env.SECRET}`
      }
    }
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY || "",
    }
  }
};

export default config;