<script lang="ts">
	import type { Machine } from '$lib/types';
	import TableMenu from './TableMenu.svelte';
	import NotesDialog from '../../../components/dialog/NotesDialog.svelte';
	import StatusBadge from '../../../components/StatusBadge.svelte';
	import UnassignDialog from '../../../components/dialog/UnassignDialog.svelte';
	import AssignDialog from '../../../components/dialog/AssignDialog.svelte';
	import PriorityIcon from './PriorityIcon.svelte';

	export let machines: Machine[] = [];

	let notesDialog: HTMLDialogElement;
	let assignDialog: HTMLDialogElement;
	let unassignDialog: HTMLDialogElement;
	let machine: Machine | null = null;

	function handleAssignEvent(position: CustomEvent<number>) {
		machine = machines[position.detail];
		assignDialog?.showModal();
	}

	function handleNotesEvent(position: CustomEvent<number>) {
		machine = machines[position.detail];
		notesDialog?.showModal();
	}

	function handleUnassignEvent(position: CustomEvent<number>) {
		machine = machines[position.detail];
		unassignDialog?.showModal();
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
				<th class="w-16">Priority</th>
				<th class="text-center w-36">Status</th>
				<th class="w-32">Last Maintenance</th>
				<th class="w-32">Next Maintenance</th>
				<th />
			</tr>
		</thead>

		<tbody>
			{#if machines.length === 0}
				<tr>
					<td class="text-lg font-semibold text-center" colspan="9">You don't have any machine assigned</td>
				</tr>
			{:else}
				{#each machines as machine, index}
					<tr class="border-none">
						<th class="w-24"><img src={machine.type.imageUrl} alt="machine" class="w-full aspect-square" /></th>
						<td>{machine.serialNumber}</td>
						<td>{machine.producent}</td>
						<td>{machine.type.name}</td>
						<td>{machine.model.name}</td>
						<td class=""><PriorityIcon priority={machine.maintainInfo.priority} /></td>
						<td><StatusBadge status={machine.status} /></td>
						<td class="text-center">{new Date().toLocaleDateString()}</td>
						<td class="text-center">{new Date().toLocaleDateString()}</td>
						<td
							><TableMenu
								position={index}
								serial={machine.serialNumber}
								on:assign={handleAssignEvent}
								on:notes={handleNotesEvent}
								on:unassign={handleUnassignEvent}
								isAssigned={machine.assignedMaintainer !== null}
							/></td
						>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<AssignDialog bind:dialog={assignDialog} serialNumber={machine?.serialNumber} defects={machine?.maintainInfo.defects} />

<NotesDialog bind:dialog={notesDialog} defects={machine?.maintainInfo.defects} serialNumber={machine?.serialNumber} />

<UnassignDialog bind:dialog={unassignDialog} serialNumber={machine?.serialNumber} />
