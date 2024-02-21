import type { Machine, ModelFilter, Pagination, ProducentFilter, TypeFilter } from '$lib/types';
import type { PageLoad } from '../$types';

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
	const page = Number(url.searchParams.get('page'));
	const offset = page > 1 ? page - 1 : 0;
	url.searchParams.delete('page');
	const filters = url.searchParams.toString();

	const response = await fetch(
		`http://localhost:5000/api/machines?limit=10&offset=${offset}${filters ? `&${filters}` : ''}`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${data.session.accessToken}`
			}
		}
	);

	const machines = await response.json();

	return { machines: machines.data, pagination: machines.meta, filters: data.filters };
}) satisfies PageLoad;
