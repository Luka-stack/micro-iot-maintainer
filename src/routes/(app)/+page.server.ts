import { fail } from '@sveltejs/kit';

import { getRequest, postRequest } from '$lib/fetch-client';
import { MachineEndpoints, MiscEndpoints } from '$lib/apis/endpoints';

import type { AuthSession } from '$lib/auth.types';
import type { PageServerLoad } from './$types';
import type { MachineFilters } from '$lib/types';

export const load = (async ({
	cookies,
	locals,
	fetch
}): Promise<{
	session: AuthSession;
	filters: MachineFilters;
}> => {
	const session = (await locals.auth()) as AuthSession;
	const filters = cookies.get('filters');

	if (filters === undefined) {
		const response = await getRequest<{ data: MachineFilters }>(fetch, MiscEndpoints.filters, session?.accessToken);

		if (response.hasError) {
			return {
				filters: {
					producents: [],
					types: [],
					models: []
				},
				session: session as AuthSession
			};
		}

		cookies.set('filters', JSON.stringify(response.fetchedData!.data), { path: '/' });
		return {
			filters: response.fetchedData!.data,
			session: session as AuthSession
		};
	}

	return { filters: JSON.parse(filters), session: session as AuthSession };
}) satisfies PageServerLoad;

export const actions = {
	assign: async ({ request, locals, fetch }) => {
		const data = await request.formData();
		const session = (await locals.auth()) as AuthSession;

		const response = await postRequest(
			fetch,
			MachineEndpoints.assign(data.get('machine')?.toString()),
			null,
			session?.accessToken
		);

		if (response.hasError) {
			return fail(response.code, { error: response.messages.join(', ') });
		}
	},
	unassign: async ({ request, locals, fetch }) => {
		const data = await request.formData();
		const session = (await locals.auth()) as AuthSession;

		const response = await postRequest(
			fetch,
			MachineEndpoints.unassign(data.get('machine')?.toString()),
			null,
			session?.accessToken
		);

		if (response.hasError) {
			return fail(response.code, { error: response.messages.join(', ') });
		}
	}
};
