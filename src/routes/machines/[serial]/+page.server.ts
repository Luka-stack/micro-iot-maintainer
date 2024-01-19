import type { AuthSession } from '$lib/auth.types';
import type { Machine } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals }): Promise<{ machine: Machine }> => {
	const session = (await locals.getSession()) as AuthSession | null;

	const response = await fetch(`http://localhost:5000/api/machines/${params.serial}/history`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.accessToken}`
		}
	});
	const machine = await response.json();

	return { machine: machine.data };
}) satisfies PageServerLoad;

export const actions = {
	assign: async ({ request, locals }) => {
		const data = await request.formData();
		const session = (await locals.getSession()) as AuthSession;

		await fetch(`http://localhost:5000/api/machines/${data.get('machine')}/assign-maintainer`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.accessToken}`
			}
		});
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
