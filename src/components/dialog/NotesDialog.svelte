<script lang="ts">
	import { Diamond } from 'lucide-svelte';

	export let dialog: HTMLDialogElement;
	export let serialNumber: string | undefined;
	export let defects: string[] | undefined;
</script>

<dialog class="modal" bind:this={dialog}>
	<div class="max-w-2xl modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Machine {serialNumber} operator's notes</h3>

		{#if defects && defects.length > 0}
			<p>See notes below left by its operator for more information:</p>
			<ul
				class="flex flex-col p-4 mt-4 space-y-2 overflow-y-auto rounded-md shadow-sm bg-black/20 max-h-60 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/40"
			>
				{#each defects as defect}
					<li class="flex items-center space-x-4 text-sm">
						<Diamond class="w-3 h-3" />
						<p>{defect}</p>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="">No notes left by the operator.</p>
		{/if}

		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>

<style>
	ul::-webkit-scrollbar-thumb {
		border-radius: 0.375rem;
	}
</style>
