import chai from 'chai';
import dotenv from 'dotenv';
import tokens from '../../../src/constants/tokens';
import getUniswapV2TradeData from '../../../src/exchanges/uniswap-v2/get-uniswap-v2-trade-data';

const { expect } = chai;
const { WETH, RSR } = tokens;

before(() => {
	dotenv.config();
});

describe('getUniswapV2TradeData', async () => {
	it('should return correct trade data', async () => {
		const tradeData = await getUniswapV2TradeData({
			sourceToken: WETH,
			destinationToken: RSR,
			sourceTokenQuantity: '1',
		});

		const {
			exchange,
			expectedRates,
			sourceTokenQuantity,
			expectedDestinationTokenQuantity,
		} = tradeData;

		expect(exchange).to.equal('Uniswap v2');
		expect(typeof expectedRates.number.expectedRate).to.equal('number');
		expect(typeof expectedRates.number.nextMidPrice).to.equal('number');
		expect(typeof sourceTokenQuantity).to.equal('string');
		expect(typeof expectedRates.string.expectedRate).to.equal('string');
		expect(typeof expectedRates.string.nextMidPrice).to.equal('string');
		expect(typeof expectedRates.formatted.expectedRate).to.equal('string');
		expect(typeof expectedRates.formatted.nextMidPrice).to.equal('string');
		expect(typeof expectedRates.formatted.nextMidPrice).to.equal('string');
		expect(typeof expectedDestinationTokenQuantity).to.equal('string');
	});
});
