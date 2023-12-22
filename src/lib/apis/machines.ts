import type { Machine, Pagination } from '$lib/types';

export async function loadMachines(): Promise<{ machines: Machine[]; pagination: Pagination }> {
	const machines = await fetch(`http://localhost:5000/api/machines?limit=10&offset=0`);
	const { data, meta } = await machines.json();

	return { machines: data, pagination: meta } satisfies { machines: Machine[]; pagination: Pagination };
}
