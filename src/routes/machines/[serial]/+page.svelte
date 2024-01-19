<script lang="ts">
	import clsx from 'clsx';
	import {
		BookmarkMinus,
		BookmarkPlus,
		BookmarkX,
		MessageSquareWarning,
		Power,
		PowerOff,
		Settings,
		Wrench
	} from 'lucide-svelte';

	import { getStatusTime } from '$lib/helpers/dates';
	import NotesDialog from '../../../components/dialog/NotesDialog.svelte';
	import ReportDialog from './_components/ReportDialog.svelte';
	import SpecificationDialog from '../../../components/dialog/SpecificationDialog.svelte';
	import AssignDialog from '../../../components/dialog/AssignDialog.svelte';
	import UnassignDialog from '../../../components/dialog/UnassignDialog.svelte';
	import HistoryTable from './_components/HistoryTable.svelte';

	export let data;

	const statusHours = getStatusTime(data.machine.lastStatusUpdate);

	let workDialog: HTMLDialogElement;
	let notesDialog: HTMLDialogElement;
	let specDialog: HTMLDialogElement;
	let assignDialog: HTMLDialogElement;
	let unassignDialog: HTMLDialogElement;
</script>

<div class="mt-10">
	<div class="grid grid-cols-5 grid-rows-2 gap-10">
		<div
			class="flex items-center justify-center col-span-2 row-span-2 p-4 border rounded-md shadow-sm border-white/10 shadow-black"
		>
			<figure class="w-64"><img src={`/${data.machine.type.imageUrl}`} alt="machine" /></figure>
		</div>

		<div class="flex flex-col items-center justify-center border rounded-md shadow-sm border-white/10 shadow-black">
			{#if !data.machine.assignedMaintainer}
				<button on:click={() => assignDialog.showModal()} class="p-5 transition-transform duration-100 active:scale-95">
					<BookmarkPlus class="w-14 h-14 text-success" />
				</button>
				<p>Assign machine</p>
			{:else if data.machine.assignedMaintainer === data.user?.email}
				<button
					on:click={() => unassignDialog.showModal()}
					class="p-5 transition-transform duration-100 active:scale-95 group"
				>
					<BookmarkMinus class="w-14 h-14 group-hover:text-error" />
				</button>
				<p>Unassign machine</p>
			{:else}
				<div class="p-5">
					<BookmarkX class="w-14 h-14 text-error" />
				</div>
				<p>Assigned to other maintainer</p>
			{/if}
		</div>

		<div class="flex flex-col items-center justify-center p-4 border rounded-md shadow-sm border-white/10 shadow-black">
			<div class="p-4">
				{#if data.machine.status === 'WORKING'}
					<Power class="w-14 h-14 text-success" />
				{:else}
					<PowerOff
						class={clsx(
							'w-14 h-14',
							data.machine.status === 'IDLE' && 'text-slate-500',
							data.machine.status === 'BROKEN' && 'text-error',
							data.machine.status === 'MAINTENANCE' && 'text-warning'
						)}
					/>
				{/if}
			</div>
			<p class="mt-1">
				{data.machine.status === 'WORKING' ? 'Working time' : 'Idle time'}
				{statusHours[0]} [h] {statusHours[1]} [min]
			</p>
		</div>

		{#if data.machine.assignedMaintainer !== data.user?.email}
			<div />
		{:else if data.machine.status !== 'MAINTENANCE' && data.machine.status !== 'BROKEN'}
			<div class="flex items-center p-5 text-center border rounded-md shadow-sm border-white/10 shadow-black">
				You cannot report work when machine is not in maintenance mode
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center border rounded-md shadow-sm border-white/10 shadow-black">
				<button
					on:click={() => workDialog.showModal()}
					class="p-5 transition-transform duration-100 active:scale-95 group"
				>
					<Wrench class="w-14 h-14 text-success group-hover:text-green-500" />
				</button>
				<p>Report done work</p>
			</div>
		{/if}

		<div class="flex flex-col items-center justify-around border rounded-md shadow-sm border-white/10 shadow-black">
			<h2 class="text-center card-title">{data.machine.serialNumber}</h2>
			<p class="text-center text-slate-500">Producent: {data.machine.serialNumber}</p>
			<p class="text-center text-slate-500">Type: {data.machine.type.name}</p>
			<p class="text-center text-slate-500">Model: {data.machine.model.name}</p>
		</div>

		<div class="flex flex-col items-center justify-center border rounded-md shadow-sm border-white/10 shadow-black">
			<button
				on:click={() => notesDialog.showModal()}
				class="p-5 transition-transform duration-100 active:scale-95 group"
			>
				<MessageSquareWarning class="w-14 h-14 group-hover:text-slate-200" />
			</button>
			<p>Operator's notes</p>
		</div>

		<div class="flex flex-col items-center justify-center border rounded-md shadow-sm border-white/10 shadow-black">
			<button
				on:click={() => specDialog.showModal()}
				class="p-5 transition-transform duration-100 active:scale-95 group"
			>
				<Settings class="w-14 h-14 group-hover:text-slate-200" />
			</button>
			<p>Machine's specification</p>
		</div>
	</div>
</div>

<HistoryTable historyData={data.machine.maintenances ? data.machine.maintenances : []} />

{#if data.machine.assignedMaintainer === data.user?.email}
	<ReportDialog
		bind:dialog={workDialog}
		serialNumber={data.machine.serialNumber}
		notes={data.machine.maintainInfo.notes}
	/>
{/if}

<NotesDialog
	bind:dialog={notesDialog}
	serialNumber={data.machine.serialNumber}
	notes={data.machine.maintainInfo.notes}
/>

<AssignDialog
	bind:dialog={assignDialog}
	serialNumber={data.machine.serialNumber}
	notes={data.machine.maintainInfo.notes}
/>

<UnassignDialog bind:dialog={unassignDialog} serialNumber={data.machine.serialNumber} />

<SpecificationDialog bind:dialog={specDialog} serialNumber={data.machine.serialNumber} model={data.machine.model} />
