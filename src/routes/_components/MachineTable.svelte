<script lang="ts">
	import { Diamond } from 'lucide-svelte';
	import { enhance } from '$app/forms';

	import type { Machine } from '$lib/types';
	import TableMenu from './TableMenu.svelte';
	import NotesDialog from '../../components/dialog/NotesDialog.svelte';

	export let machines: Machine[] = [];

	let notesDialog: HTMLDialogElement;
	let assignDialog: HTMLDialogElement;
	let machine: Machine | null = null;

	function handleAssignEvent(position: CustomEvent<number>) {
		machine = machines[position.detail];
		assignDialog?.showModal();
	}

	function handleNotesEvent(position: CustomEvent<number>) {
		machine = machines[position.detail];
		notesDialog?.showModal();
	}
</script>

<div class="overflow-y-auto border rounded-md shadow-sm border-white/10 shadow-black table-scrollbar">
	<table class="table rounded-md">
		<thead class="main-gradient">
			<tr class="border-none">
				<th class="rounded-tl-md" />
				<th>Serial number</th>
				<th>Producent</th>
				<th>Type</th>
				<th>Model</th>
				<th>Status</th>
				<th>Last Maintenance</th>
				<th>Next Maintenance</th>
				<th />
			</tr>
		</thead>

		<tbody>
			{#each machines as machine, index}
				<tr class="border-none">
					<th class="w-24"><img src={machine.type.imageUrl} alt="machine" class="w-full aspect-square" /></th>
					<td>{machine.serialNumber}</td>
					<td>{machine.producent}</td>
					<td>{machine.type.name}</td>
					<td>{machine.model.name}</td>
					<td>{machine.status}</td>
					<td>{new Date().toLocaleDateString()}</td>
					<td>{new Date().toLocaleDateString()}</td>
					<td
						><TableMenu
							position={index}
							on:assign={handleAssignEvent}
							on:notes={handleNotesEvent}
							isAssigned={machine.assignedMaintainer !== null}
						/></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<dialog class="modal" bind:this={assignDialog}>
	<div class="max-w-2xl modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
		</form>
		<h3 class="mb-2 text-lg font-bold">Assign machine {machine?.serialNumber} to me!</h3>
		<p class="">You are committing to fixing a machine by assigning it to yourself.</p>

		{#if machine?.maintainInfo.notes && machine.maintainInfo.notes.length > 0}
			<p class="">See notes below left by the machine operator for more information:</p>
			<ul
				class="flex flex-col p-4 mt-4 space-y-2 overflow-y-auto rounded-md shadow-sm bg-black/20 max-h-40 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/40"
			>
				{#each machine.maintainInfo.notes as note}
					<li class="flex items-center space-x-2 text-sm">
						<Diamond class="w-3 h-3" />
						<p>{note}</p>
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
					return async ({ update }) => {
						await update();
						assignDialog.close();
					};
				}}
			>
				<input type="hidden" name="machine" value={machine?.serialNumber} />

				<button class="btn btn-primary">Assign</button>
			</form>
		</div>
	</div>
</dialog>

<NotesDialog bind:dialog={notesDialog} notes={machine?.maintainInfo.notes} serialNumber={machine?.serialNumber} />

<!-- <dialog class="modal" bind:this={notesDialog}>
	<div class="max-w-2xl modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
		</form>
		<h3 class="mb-2 text-lg font-bold">Machine {machine?.serialNumber} operator's notes</h3>

		{#if machine?.maintainInfo.notes && machine.maintainInfo.notes.length > 0}
			<p class="">See notes below left by its operator for more information:</p>
			<ul
				class="flex flex-col p-4 mt-4 space-y-2 overflow-y-auto rounded-md shadow-sm bg-black/20 max-h-60 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/40"
			>
				{#each machine.maintainInfo.notes as note}
					<li class="flex items-center space-x-4 text-sm">
						<Diamond class="w-3 h-3" />
						<p>{note}</p>
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
</dialog> -->

<style>
	ul::-webkit-scrollbar-thumb {
		border-radius: 0.375rem;
	}
</style>
