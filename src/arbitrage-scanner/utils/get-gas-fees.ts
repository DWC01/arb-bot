import { web3 } from '../../providers/web3';
import tokens from '../../constants/tokens';
import getChainlinkTokenPrice from '../../oracles/chainlink/get-chainlink-price-for-token';

const getGasFees = async (gasPriceGwei: string, estimatedGas: string) => {
	const { ETH } = tokens;
	const priceEtherUSD = await getChainlinkTokenPrice(ETH.symbol);

	const gasPriceWei = web3.utils.toWei(gasPriceGwei, 'gwei');
	const gasPriceEth = web3.utils.fromWei(gasPriceWei, 'ether');

	const gasFeeEth = Number(gasPriceEth) * Number(estimatedGas);
	const gasPriceUSD = Number(gasFeeEth) * Number(priceEtherUSD);

	console.log('--- gasPriceGwei', gasPriceGwei);
	console.log('--- gasPriceWei', gasPriceWei);
	console.log('--- gasPriceEth', gasPriceEth);
	console.log('--- estimatedGas', estimatedGas);
	console.log('--- gasFeeEth', gasFeeEth);
	console.log('--- gasPriceUSD', gasPriceUSD);

	return {
		eth: gasFeeEth.toString(),
		usd: gasPriceUSD.toFixed(2),
	};
};

export default getGasFees;
