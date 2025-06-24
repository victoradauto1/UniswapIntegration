import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const UniswapIntegrationModule = buildModule("UniswapIntegrationModule", (m) => {
  // Parâmetro que pode ser alterado por rede (por exemplo: Mainnet, Polygon, Localhost)
  const uniswapRouter = m.getParameter("uniswapRouter", "0xE592427A0AEce92De3Edee1F18E0157C05861564");

  const uniswapIntegration = m.contract("UniswapIntegration", [], {
    // Passa nada no construtor, mas depois setamos o router
  });

  // Após o deploy, chama `setUniswap(...)`
  m.call(uniswapIntegration, "setUniswap", [uniswapRouter]);

  return { uniswapIntegration };
});

export default UniswapIntegrationModule;
