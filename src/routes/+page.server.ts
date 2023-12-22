import type { ModelFilter, ProducentFilter, TypeFilter } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({
	cookies
}): Promise<{
	producents: ProducentFilter[];
	types: TypeFilter[];
	models: ModelFilter[];
}> => {
	const filters = cookies.get('filters');
	if (!filters) {
		const response = await fetch('http://localhost:5000/api/misc/filters');
		const { data } = await response.json();

		cookies.set('filters', JSON.stringify(data), { path: '/' });

		return data;
	}

	return JSON.parse(filters);
}) satisfies PageServerLoad;
