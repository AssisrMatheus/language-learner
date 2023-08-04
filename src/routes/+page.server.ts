import type { PageServerLoad } from './$types';
import reverso, {
	availableConjugationLanguages,
	type AvailableConjugationLanguages
} from '$lib/reverso';

export const load = (async ({ url }) => {
	const search = url.searchParams.get('search'),
		language = url.searchParams.get('language');

	if (search && language && availableConjugationLanguages[language]) {
		return {
			conjugation: await reverso.conjugate(search, language as AvailableConjugationLanguages),
			search: {
				search,
				language
			}
		};
	}

	return {
		search: {
			search,
			language
		}
	};
}) satisfies PageServerLoad;
