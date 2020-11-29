import * as errMessages from './errMessages';

export type ErrorCodes = keyof typeof errMsg;

export const errMsg = {
	500: errMessages.err500,
	501: errMessages.err501,
	502: errMessages.err502,
	503: errMessages.err503,
	504: errMessages.err504,
	505: errMessages.err505,
	506: errMessages.err506,
	507: errMessages.err507,
	508: errMessages.err508,
	509: errMessages.err509
};

export const api = (process.env.API_URL as string) || 'http://localhost:9000';

export type User = {
	id: number;
	name: string;
	username: string;
	dob: Date;
	email: string;
};

export type Doctor = {
	id: number;
	locality: string;
	name: string;
	speciality: string;
	pin_code: number;
	phone_number: string;
};

export type Store = {
	id: number;
	locality: string;
	name: string;
	website: string;
	pin_code: number;
	phone_number: string;
};

export type Meds = {
	data: Array<{
		generic: string;
		brand: string;
		manufacturer: string;
		route: string;
	}>;
};
