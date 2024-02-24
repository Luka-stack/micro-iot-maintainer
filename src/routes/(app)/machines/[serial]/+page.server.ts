import { error, fail } from '@sveltejs/kit';

import { MachineEndpoints } from '$lib/apis/endpoints';
import { getRequest, postRequest } from '$lib/fetch-client';

import type { AuthSession } from '$lib/auth.types';
import type { PageServerLoad } from './$types';
import type { Machine, RepairHistory } from '$lib/types';

async function loadHistory(
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	serial: string,
	token: string
): Promise<RepairHistory[]> {
	const response = await fetch(MachineEndpoints.history(serial), {
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

export const load = (async ({
	fetch,
	params,
	locals
}): Promise<{ machine: Machine; history: Promise<RepairHistory[]> }> => {
	const session = (await locals.auth()) as AuthSession | null;

	const history = loadHistory(fetch, params.serial, session?.accessToken ?? '');

	const machine = await getRequest<{ data: Machine }>(
		fetch,
		MachineEndpoints.findOne(params.serial),
		session?.accessToken
	);

	if (machine.hasError) {
		if (machine.code === 404 || machine.code === 401) {
			error(404, 'Not found');
		} else {
			error(500, 'Failed to fetch machine');
		}
	}

	return { machine: machine.fetchedData!.data, history };
}) satisfies PageServerLoad;

export const actions = {
	assign: async ({ fetch, request, locals }) => {
		const data = await request.formData();
		const session = (await locals.auth()) as AuthSession;

		const response = await postRequest(
			fetch,
			MachineEndpoints.assign(data.get('machine')?.toString()),
			null,
			session?.accessToken
		);

		if (response.hasError) {
			fail(response.code, { error: response.messages });
		}
	},

	unassign: async ({ fetch, request, locals }) => {
		const data = await request.formData();
		const session = (await locals.auth()) as AuthSession;

		const response = await postRequest(
			fetch,
			MachineEndpoints.unassign(data.get('machine')?.toString()),
			null,
			session?.accessToken
		);

		if (response.hasError) {
			fail(response.code, { error: response.messages });
		}
	},

	report: async ({ fetch, request, locals }) => {
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

		const response = await postRequest(
			fetch,
			MachineEndpoints.report(data.get('machine')?.toString()),
			{
				description: desc,
				nextMaintenance: next,
				defects
			},
			session?.accessToken
		);

		if (response.hasError) {
			fail(response.code, { error: response.messages });
		}
	}
};
