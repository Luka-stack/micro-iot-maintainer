<script lang="ts">
	import type { RepairHistory } from '$lib/types';
	import { Check, X } from 'lucide-svelte';
	import StatusBadge from '../../../../../components/StatusBadge.svelte';

	export let history: RepairHistory;

	let checked = false;

	$: console.log(history.scheduled);
</script>

<div class="rounded-md collapse collapse-arrow">
	<input type="checkbox" name="my-accordion-2" bind:checked />

	<div class="grid grid-cols-5 font-medium collapse-title">
		<div class="mx-auto">
			<StatusBadge status={history.type} />
		</div>
		<div>Done: {new Date(history.date).toLocaleDateString()}</div>
		<div class="relative">
			On Time:
			{#if new Date(history.date) <= new Date(history.nextMaintenance)}
				<Check class="absolute top-0 w-6 h-6 left-20" />
			{:else}
				<X class="absolute top-0 w-6 h-6 left-20" />
			{/if}
		</div>
		<div>Next: {new Date(history.scheduled).toLocaleDateString()}</div>
		<div>Maintainer: {history.maintainer}</div>
	</div>

	<div class="collapse-content bg-base-200">
		<h5 class="mt-1 font-semibold">What was done:</h5>
		<p class="p-2 mt-2 border rounded-md border-white/10">{history.description}</p>
	</div>
</div>
