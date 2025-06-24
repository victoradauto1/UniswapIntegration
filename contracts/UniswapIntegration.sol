// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20 ;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract UniswapIntegration{
    
    ISwapRouter public uniswap;

    address private constant WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270;

    address private constant WETH = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;


    uint24 private constant poolFee = 3000; //0,3% (* 10000)

    constructor (){
        uniswap = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    }

    function setUniswap(address _uniswap) external {
        uniswap = ISwapRouter(_uniswap);
    }

    function swap(address tokenIn, address tokenOut, uint amountIn) internal returns(uint amountOut){

            //aprove tokenIn

        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);

        TransferHelper.safeApprove(tokenIn, address(uniswap), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = 
        ISwapRouter.ExactInputSingleParams({
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: poolFee,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });

        amountOut = uniswap.exactInputSingle(params);
    }

    function swapMaticEth(uint maticAmount) external returns(uint ethAmount){
        ethAmount = swap(WMATIC, WETH, maticAmount);

    }

    function swapEthMatic(uint ethAmount) external returns(uint maticAmount){
        maticAmount = swap(WETH, WMATIC, ethAmount);
    }
}
