import { error } from '@sveltejs/kit';
import { getRequest } from '$lib/fetch-client';
import { MachineEndpoints } from '$lib/apis/endpoints';

import type { PageLoad } from './$types';
import type { Machine, MachineFilters, Pagination } from '$lib/types';

type ReturnData = {
	machines: Machine[];
	pagination: Pagination;
	filters: MachineFilters;
};

export const load = (async ({ fetch, data, url }): Promise<ReturnData> => {
	const page = Number(url.searchParams.get('page'));
	const offset = page > 1 ? page - 1 : 0;
	url.searchParams.delete('page');
	const filters = url.searchParams.toString();

	const response = await getRequest<{ data: Machine[]; meta: Pagination }>(
		fetch,
		MachineEndpoints.findMany(offset, filters),
		data.session.accessToken
	);

	if (response.hasError) {
		error(400, { message: response.messages.join(', ') });
	}

	const machinesData = response.fetchedData!;

	return { machines: machinesData.data, pagination: machinesData.meta, filters: data.filters };
}) satisfies PageLoad;
