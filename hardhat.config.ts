import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.28" },
      { version: "0.7.6" },
    ],
  },
  // @ts-ignore - solcover não está tipado no HardhatUserConfig
  solcover: {
    skipFiles: [
      'test/mocks/',
      'contracts/mocks/',
      'mocks/',
      // Adicione caminhos específicos se necessário
      // 'contracts/MockUniswapRouter.sol'
    ]
  }
};

export default config;