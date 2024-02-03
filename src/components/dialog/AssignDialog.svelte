<script lang="ts">
	import { Diamond } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	export let dialog: HTMLDialogElement;
	export let serialNumber: string | undefined;
	export let defects: string[] | undefined;
</script>

<dialog class="modal" bind:this={dialog}>
	<div class="max-w-2xl modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
		</form>
		<h3 class="mb-2 text-lg font-bold">Assign machine {serialNumber} to me!</h3>
		<p class="">You are committing to fixing a machine by assigning it to yourself.</p>

		{#if defects && defects.length > 0}
			<p class="">See notes below left by the machine operator for more information:</p>
			<ul
				class="flex flex-col p-4 mt-4 space-y-2 overflow-y-auto rounded-md shadow-sm bg-black/20 max-h-40 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/40"
			>
				{#each defects as defect}
					<li class="flex items-center space-x-2 text-sm">
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

			<form
				method="post"
				action="?/assign"
				use:enhance={() => {
					return async ({ result, update }) => {
						await update();

						if (result.status !== 200) {
							// @ts-ignore
							toast.error(result.data.error);
						}

						dialog.close();
					};
				}}
			>
				<input type="hidden" name="machine" value={serialNumber} />

				<button class="btn btn-primary">Assign</button>
			</form>
		</div>
	</div>
</dialog>

<style>
	ul::-webkit-scrollbar-thumb {
		border-radius: 0.375rem;
	}
</style>
