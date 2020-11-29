import Token from './Token';

export interface Number {
	[key: string]: number;
}

export interface String {
	[key: string]: string;
}

export interface Formatted {
	[key: string]: string;
}

export interface ExpectedRatesObj {
	number: Number;
	string: String;
	formatted: Formatted;
}

export interface Trade {
	exchange: string;
	sourceToken: Token;
	destinationToken: Token;
	sourceTokenQuantity: string;
	platformFees?: string;
	expectedDestinationTokenQuantity: string;
	expectedRates: ExpectedRatesObj;
}

export default Trade;
