import type { AuthSession } from '$lib/auth.types';
import type { Machine, RepairHistory } from '$lib/types';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

async function loadHistory(serial: string, token: string): Promise<RepairHistory[]> {
	const response = await fetch(`http://localhost:5000/api/machines/${serial}/history`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		return [];
	}

	const history = await response.json();
	return history.data;
}

export const load = (async ({ params, locals }): Promise<{ machine: Machine; history: Promise<RepairHistory[]> }> => {
	const session = (await locals.auth()) as AuthSession | null;

	const history = loadHistory(params.serial, session?.accessToken ?? '');

	const response = await fetch(`http://localhost:5000/api/machines/${params.serial}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.accessToken}`
		}
	});

	if (response.status === 404 || response.status === 401) {
		error(404, 'Not found');
	}

	if (!response.ok) {
		error(500, 'Failed to fetch machine');
	}

	const machine = await response.json();

	return { machine: machine.data, history };
}) satisfies PageServerLoad;

export const actions = {
	assign: async ({ request, locals }) => {
		const data = await request.formData();
		const session = (await locals.auth()) as AuthSession;

		await fetch(`http://localhost:5000/api/machines/${data.get('machine')}/assign-maintainer`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.accessToken}`
			}
		});
	},
	unassign: async ({ request, locals }) => {
		const data = await request.formData();
		const session = (await locals.auth()) as AuthSession;

		await fetch(`http://localhost:5000/api/machines/${data.get('machine')}/unassign-maintainer`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session?.accessToken}`
			}
		});
	},
	report: async ({ request, locals }) => {
		const [data, session] = await Promise.all([request.formData(), locals.auth() as AuthSession]);
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
