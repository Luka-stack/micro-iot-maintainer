import { fail } from '@sveltejs/kit';
import type { AuthSession } from '$lib/auth.types';
import type { PageServerLoad } from '../$types';
import type { ModelFilter, ProducentFilter, TypeFilter } from '$lib/types';

export const load = (async ({
	cookies,
	locals
}): Promise<{
	session: AuthSession;
	filters: {
		producents: ProducentFilter[];
		types: TypeFilter[];
		models: ModelFilter[];
	};
}> => {
	const session = (await locals.getSession()) as AuthSession;
	const filters = cookies.get('filters');

	if (filters === undefined) {
		const response = await fetch('http://localhost:5000/api/misc/filters', {
			headers: {
				Authorization: `Bearer ${session?.accessToken}`
			}
		});

		const { data } = await response.json();

		cookies.set('filters', JSON.stringify(data), { path: '/' });

		return { filters: data, session: session as AuthSession };
	}

	return { filters: JSON.parse(filters), session: session as AuthSession };
}) satisfies PageServerLoad;

export const actions = {
	assign: async ({ request, locals }) => {
		const data = await request.formData();
		const session = (await locals.getSession()) as AuthSession;

		const response = await fetch(`http://localhost:5000/api/machines/${data.get('machine')}/assign-maintainer`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.accessToken}`
			}
		});

		if (response.status !== 200) {
			const error = await response.json();

			return fail(error.statusCode, { error: error.message });
		}
	},
	unassign: async ({ request, locals }) => {
		const data = await request.formData();
		const session = (await locals.getSession()) as AuthSession;

		await fetch(`http://localhost:5000/api/machines/${data.get('machine')}/unassign-maintainer`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.accessToken}`
			}
		});
	}
};
