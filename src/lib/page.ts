import { JSDOM } from 'jsdom';

export const parsePage = async (url: string) => {
	const response = await fetch(url, {
		method: 'GET'
	});
	const body = await response.text();

	return new JSDOM(body);
};
