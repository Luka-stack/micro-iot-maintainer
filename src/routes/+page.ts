import type { Machine, ModelFilter, Pagination, ProducentFilter, TypeFilter } from '$lib/types';
import type { PageLoad } from './$types';

type ReturnData = {
	machines: Machine[];
	pagination: Pagination;
	filters: {
		producents: ProducentFilter[];
		types: TypeFilter[];
		models: ModelFilter[];
	};
};

export const load = (async ({ fetch, data, url }): Promise<ReturnData> => {
	const offset = Number(url.searchParams.get('page')) - 1 || 0;
	url.searchParams.delete('page');
	const filters = url.searchParams.toString();

	const response = await fetch(
		`http://localhost:5000/api/machines?limit=10&offset=${offset}${filters ? `&${filters}` : ''}`
	);
	const machines = await response.json();

	return { machines: machines.data, pagination: machines.meta, filters: data };
}) satisfies PageLoad;
