<script lang="ts">
	import { MoreHorizontal } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	export let position: number;
	export let isAssigned: boolean;

	const dispatch = createEventDispatcher<{ assign: number; notes: number }>();

	function dispatchAssignClick() {
		dispatch('assign', position);
	}

	function dispatchNotesClick() {
		dispatch('notes', position);
	}
</script>

<div class="dropdown dropdown-end" class:dropdown-top={position > 5}>
	<button class="btn btn-square btn-sm">
		<MoreHorizontal class="w-5 h-5" />
	</button>
	<div class="z-50 p-2 border shadow-sm border-white/10 shadow-black dropdown-content bg-base-100 rounded-box w-52">
		<h4 class="p-2 font-medium">Actions</h4>
		<button class="w-full p-2 text-left rounded-md hover:bg-slate-500/20">Details</button>
		<hr class="my-2 border-white/10" />

		<button on:click={dispatchNotesClick} class="w-full p-2 text-left rounded-md hover:bg-slate-500/20"
			>Read notes</button
		>

		{#if !isAssigned}
			<button on:click={dispatchAssignClick} class="w-full p-2 text-left rounded-md hover:bg-slate-500/20"
				>Assign to me</button
			>
		{/if}
	</div>
</div>
