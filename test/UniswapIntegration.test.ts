import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("UniswapIntegration tests", function () {
  async function deployUniswapIntegration() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const UniswapIntegration = await hre.ethers.getContractFactory("UniswapIntegration");
    const uniswapIntegration = await UniswapIntegration.deploy();

    return { uniswapIntegration, owner, otherAccount };
  }

  describe("Function: setUniswap", function () {
    it("Should update the uniswap router address", async function () {
      const { uniswapIntegration } = await loadFixture(deployUniswapIntegration);

      // Criamos um endereço aleatório (simulando outro contrato Uniswap)
      const fakeRouter = hre.ethers.Wallet.createRandom().address;

      // Chamamos a função setUniswap com esse endereço fake
      await uniswapIntegration.setUniswap(fakeRouter);

      // Verificamos se o endereço foi atualizado corretamente
      const currentRouter = await uniswapIntegration.uniswap();
      expect(currentRouter).to.equal(fakeRouter);
    });

      describe("Function: swapMaticEth", function () {
    it("Should call internal swap with WMATIC → WETH", async function () {
      const { uniswapIntegration } = await loadFixture(deployUniswapIntegration);

      // Criamos um contrato mock para ISwapRouter com a função `exactInputSingle`
      const MockRouter = await hre.ethers.getContractFactory("MockSwapRouter");
      const mockRouter = await MockRouter.deploy();
      await mockRouter.waitForDeployment();

      const mockRouterAddress = await mockRouter.getAddress();

      // Atualizamos o contrato para usar o mock
      await uniswapIntegration.setUniswap(mockRouterAddress);

      // Executamos a função com valor de teste
      const tx = await uniswapIntegration.swapMaticEth(1000);
      const receipt = await tx.wait();

      // Aqui só validamos que o contrato aceitou a transação e a swap foi chamada
      expect(receipt!.status).to.equal(1);
    });
  });

  describe("Function: swapEthMatic", function () {
    it("Should call internal swap with WETH → WMATIC", async function () {
      const { uniswapIntegration } = await loadFixture(deployUniswapIntegration);

      const MockRouter = await hre.ethers.getContractFactory("MockSwapRouter");
      const mockRouter = await MockRouter.deploy();
      await mockRouter.waitForDeployment();

      const mockRouterAddress = await mockRouter.getAddress();
      await uniswapIntegration.setUniswap(mockRouterAddress);

      const tx = await uniswapIntegration.swapEthMatic(2000);
      const receipt = await tx.wait();

      expect(receipt!.status).to.equal(1);
    });
  });

  });
});
