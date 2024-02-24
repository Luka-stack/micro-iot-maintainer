<script lang="ts">
	import type { RepairHistory } from '$lib/types';
	import HistoryRow from './HistoryRow.svelte';

	export let historyData: RepairHistory[];

	let filter = 'all';
	let filteredData: RepairHistory[] = [...historyData];

	const handleFilterSelect = (type: string) => {
		if (type === 'all') {
			filter = 'all';
			filteredData = historyData;
			return;
		}

		if (type === 'maintenanced') {
			filter = 'maintenanced';
			filteredData = historyData.filter((item) => item.type === 'MAINTENANCE');
			return;
		}

		if (type === 'repaired') {
			filter = 'repaired';
			filteredData = historyData.filter((item) => item.type === 'REPAIR');
			return;
		}
	};
</script>

<div class="mt-10 overflow-hidden border divide-y rounded-md shadow-sm border-white/10 shadow-black divide-white/10">
	<div class="flex items-center justify-between p-4 mb-5 space-y-3">
		<h3 class="text-2xl font-semibold">Machine repair history</h3>
		<div class="space-x-3">
			<button
				on:click={() => handleFilterSelect('all')}
				class="btn btn-sm btn-outline hover:btn-primary"
				class:btn-primary={filter === 'all'}
				class:pointer-events-none={filter === 'all'}
			>
				All
			</button>
			<button
				on:click={() => handleFilterSelect('maintenanced')}
				class="btn btn-sm btn-outline hover:btn-warning"
				class:btn-warning={filter === 'maintenanced'}
				class:pointer-events-none={filter === 'maintenanced'}
			>
				Maintenanced
			</button>
			<button
				on:click={() => handleFilterSelect('repaired')}
				class="btn btn-sm btn-outline hover:btn-error"
				class:btn-error={filter === 'repaired'}
				class:pointer-events-none={filter === 'repaired'}
				>Repaired
			</button>
		</div>
	</div>

	{#if historyData.length === 0}
		<div class="flex items-center justify-center p-10">
			<p class="text-xl text-slate-500">This machine does not have maintenance history</p>
		</div>
	{:else}
		{#each historyData as history}
			<HistoryRow {history} />
		{/each}
	{/if}
</div>
