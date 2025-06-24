// SPDX-License-Identifier: MIT
/* solhint-disable */
/* coverage:ignore-start */
pragma solidity ^0.8.20;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract MockSwapRouter is ISwapRouter {
    function exactInputSingle(ExactInputSingleParams calldata) external payable override returns (uint256) {
        return 123456;
    }

    function exactInput(ExactInputParams calldata) external payable override returns (uint256) {
        return 0;
    }

    function exactOutputSingle(ExactOutputSingleParams calldata) external payable override returns (uint256) {
        return 0;
    }

    function exactOutput(ExactOutputParams calldata) external payable override returns (uint256) {
        return 0;
    }

    function uniswapV3SwapCallback(int256, int256, bytes calldata) external override {
        // necessária pela interface herdada
    }
}
