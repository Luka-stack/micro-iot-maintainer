import type { AuthSession } from '$lib/auth.types';
import type { Machine } from '$lib/types';
import { fail } from '@sveltejs/kit';
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
	},
	report: async ({ request, locals }) => {
		const [data, session] = await Promise.all([request.formData(), locals.getSession() as AuthSession]);
		const next = data.get('nextMaintenance') ?? '';
		const desc = data.get('description') ?? '';
		const defects = JSON.parse(data.get('defects')?.toString() ?? '[]');

		const errors: Record<string, { value: string; error: string }> = {};

		if (!next) {
			errors['nextMaintenance'] = {
				value: next,
				error: "Next maintenance date can't be empty"
			};
		}

		if (!desc) {
			errors['description'] = {
				value: desc,
				error: "Description can't be empty"
			};
		}

		if (Object.keys(errors).length > 0) {
			return fail(422, errors);
		}

		try {
			const response = await fetch(`http://localhost:5000/api/machines/${data.get('machine')}/report-maintenance`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${session?.accessToken}`
				},
				body: JSON.stringify({
					description: desc,
					nextMaintenance: next,
					defects
				})
			});

			const json = await response.json();

			console.log(json);
		} catch (err) {
			console.log(err);
		}
	}
};
