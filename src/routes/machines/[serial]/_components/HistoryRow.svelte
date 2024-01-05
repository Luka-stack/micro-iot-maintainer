<script lang="ts">
	import type { RepairHistory } from '$lib/types';
	import { Check, X } from 'lucide-svelte';

	export let history: RepairHistory;

	let checked = false;
</script>

<div class="rounded-md collapse collapse-arrow">
	<input type="checkbox" name="my-accordion-2" bind:checked />

	<div class="grid grid-cols-5 font-medium collapse-title">
		<div class="mx-auto">
			<div
				class="px-2 py-1 text-xs text-center border w-28 rounded-badge"
				class:border-error={history.type === 'REPAIR'}
				class:stripes-repair={history.type === 'REPAIR'}
				class:border-warning={history.type === 'MAINTENANCE'}
				class:stripes-main={history.type === 'MAINTENANCE'}
			>
				{history.type}
			</div>
		</div>
		<div>Done: {new Date(history.date).toLocaleDateString()}</div>
		<div class="flex">
			{#if new Date(history.date) <= new Date(history.lastSchedule)}
				On Time: <Check class="w-5 h-5 my-auto ml-1" />
			{:else}
				On Time: <X class="w-5 h-5 my-auto ml-1" />
			{/if}
		</div>
		<div>Next: {new Date(history.nextSchedule).toLocaleDateString()}</div>
		<div>Maintainer: {history.maintainer}</div>
	</div>

	<div class="collapse-content bg-base-200">
		<h5 class="mt-1 font-semibold">What was done:</h5>
		<p class="p-2 mt-2 border rounded-md border-white/10">{history.description}</p>
	</div>
</div>

<style>
	.stripes-repair {
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 12px,
			var(--fallback-er, oklch(var(--er) / 0.5)) 13px,
			var(--fallback-er, oklch(var(--er) / 0.5)) 13px
		);
	}

	.stripes-main {
		background: repeating-linear-gradient(
			45deg,
			transparent,
			transparent 12px,
			var(--fallback-wa, oklch(var(--wa) / 0.5)) 13px,
			var(--fallback-wa, oklch(var(--wa) / 0.5)) 13px
		);
	}
</style>
