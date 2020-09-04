import Web3 from 'web3';
import TokenInterface from '../../interfaces/Token';

interface GetExectutionPriceArgs {
	web3: Web3;
	sourceToken: TokenInterface;
	destinationToken: TokenInterface;
	sourceQuantity?: string;
}

export default GetExectutionPriceArgs;