import chai from 'chai';
import dotenv from 'dotenv';
import { web3 } from '../../../../src/providers/web3';
import tokens from '../../../../src/constants/tokens';
import getUniswapV2Trade from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-trade';
import getUniswapV2Tokens from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-tokens';
import getUniswapV2TradeArgs from '../../../../src/exchanges/uniswap-v2/utils/get-uniswap-v2-trade-args';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('getUniswapV2TradeArgs', () => {
	it('should return a UniswapV2 trade args', async () => {
		const sourceToken = WETH;
		const destinationToken = RSR;
		const sourceTokenQuantity = '1';
		const amountIn = web3.utils.toWei(sourceTokenQuantity);

		const { uniSourceToken, uniDestinationToken } = getUniswapV2Tokens({
			sourceToken,
			destinationToken,
		});

		const uniTrade = await getUniswapV2Trade({
			amountIn,
			uniSourceToken,
			uniDestinationToken,
		});

		const { amountOutMin, to, path, deadline } = getUniswapV2TradeArgs({
			uniTrade,
			uniSourceToken,
			uniDestinationToken,
		});

		expect(typeof amountOutMin).to.equal('string');
		expect(to).to.equal(process.env.METAMASK_ADDRESS);
		expect(path).to.deep.equal([
			uniSourceToken.address,
			uniDestinationToken.address,
		]);
		expect(typeof deadline).to.equal('number');

		expect(true).to.equal(true);
	});
});
