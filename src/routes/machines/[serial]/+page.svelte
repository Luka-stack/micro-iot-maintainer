<script lang="ts">
	import { MessageSquareWarning, PowerOff, Settings, Wrench } from 'lucide-svelte';

	import type { Machine, RepairHistory } from '$lib/types';
	import HistoryRow from './_components/HistoryRow.svelte';
	import NotesDialog from '../../../components/dialog/NotesDialog.svelte';
	import ReportDialog from './_components/ReportDialog.svelte';
	import SpecificationDialog from '../../../components/dialog/SpecificationDialog.svelte';

	const spec: Machine['model'] = {
		name: '',
		defaultRate: 120,
		minRate: 360,
		maxRate: 300,
		faultRate: 0.25,
		workBase: 30000,
		workRange: 1000
	};

	const exampleData: RepairHistory[] = [
		{
			serialNumber: '20beb7c2-cffa',
			maintainer: 'main.1@iotfox.pl',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
			type: 'MAINTENANCE',
			date: '2021-09-10T12:00:00.000Z',
			nextSchedule: '2021-09-09T12:00:00.000Z',
			lastSchedule: '2021-09-01T12:00:00.000Z'
		},
		{
			serialNumber: '20beb7c2-cffa',
			maintainer: 'main.1@iotfox.pl',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
			type: 'REPAIR',
			date: '2021-09-01T12:00:00.000Z',
			nextSchedule: '2021-09-01T12:00:00.000Z',
			lastSchedule: '2021-09-01T12:00:00.000Z'
		},
		{
			serialNumber: '20beb7c2-cffa',
			maintainer: 'main.1@iotfox.pl',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
			type: 'MAINTENANCE',
			date: '2021-09-01T12:00:00.000Z',
			nextSchedule: '2021-09-01T12:00:00.000Z',
			lastSchedule: '2021-09-01T12:00:00.000Z'
		},
		{
			serialNumber: '20beb7c2-cffa',
			maintainer: 'main.1@iotfox.pl',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
			type: 'MAINTENANCE',
			date: '2021-09-01T12:00:00.000Z',
			nextSchedule: '2021-09-01T12:00:00.000Z',
			lastSchedule: '2021-09-01T12:00:00.000Z'
		},
		{
			serialNumber: '20beb7c2-cffa',
			maintainer: 'main.1@iotfox.pl',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
			type: 'REPAIR',
			date: '2021-09-01T12:00:00.000Z',
			nextSchedule: '2021-09-01T12:00:00.000Z',
			lastSchedule: '2021-09-01T12:00:00.000Z'
		},
		{
			serialNumber: '20beb7c2-cffa',
			maintainer: 'main.1@iotfox.pl',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam n',
			type: 'MAINTENANCE',
			date: '2021-09-01T12:00:00.000Z',
			nextSchedule: '2021-09-01T12:00:00.000Z',
			lastSchedule: '2021-09-01T12:00:00.000Z'
		}
	];

	let filter: string = 'all';
	let workDialog: HTMLDialogElement;
	let notesDialog: HTMLDialogElement;
	let specDialog: HTMLDialogElement;
	let data: RepairHistory[] = [...exampleData];

	const handleFilterSelect = (type: string) => {
		if (type === 'all') {
			filter = 'all';
			data = exampleData;
			return;
		}

		if (type === 'maintenanced') {
			filter = 'maintenanced';
			data = exampleData.filter((item) => item.type === 'MAINTENANCE');
			return;
		}

		if (type === 'repaired') {
			filter = 'repaired';
			data = exampleData.filter((item) => item.type === 'REPAIR');
			return;
		}
	};
</script>

<div class="mt-10">
	<div class="grid grid-cols-5 grid-rows-2 gap-10">
		<div
			class="flex items-center justify-center col-span-2 row-span-2 p-4 border rounded-md shadow-sm border-white/10 shadow-black"
		>
			<figure class="w-64"><img src="/machine.png" alt="machine" /></figure>
		</div>

		<div
			class="flex flex-col items-center justify-center row-span-2 space-y-5 border rounded-md shadow-sm border-white/10 shadow-black"
		>
			<h2 class="text-center card-title">20beb7c2-cffa</h2>
			<p class="text-center text-slate-500">Producent: Kawasaki</p>
			<p class="text-center text-slate-500">Type: Boxers</p>
			<p class="text-center text-slate-500">Model: kawa-sashi</p>
		</div>

		<div class="flex flex-col items-center justify-center p-4 border rounded-md shadow-sm border-white/10 shadow-black">
			<div class="p-4">
				<PowerOff class="w-14 h-14 text-error" />
			</div>
			<p class="mt-1">Idle hours: 198 [h] 54 [min]</p>
		</div>

		<div class="flex flex-col items-center justify-center border rounded-md shadow-sm border-white/10 shadow-black">
			<button on:click={() => workDialog.showModal()} class="p-5 transition-transform duration-100 active:scale-95">
				<Wrench class="w-14 h-14 text-success" />
			</button>
			<p>Report done work</p>
		</div>

		<div class="flex flex-col items-center justify-center border rounded-md shadow-sm border-white/10 shadow-black">
			<button on:click={() => notesDialog.showModal()} class="p-5 transition-transform duration-100 active:scale-95">
				<MessageSquareWarning class="w-14 h-14" />
			</button>
			<p>Operator's notes</p>
		</div>

		<div class="flex flex-col items-center justify-center border rounded-md shadow-sm border-white/10 shadow-black">
			<button class="p-5 transition-transform duration-100 active:scale-95">
				<Settings class="w-14 h-14" />
			</button>
			<p>Machine's specification</p>
		</div>
	</div>
</div>

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

	{#each data as history}
		<HistoryRow {history} />
	{/each}
</div>

<ReportDialog bind:dialog={workDialog} serialNumber={'20beb7c2-cffa'} notes={['One', 'Two', 'Three', 'Four', 'Five']} />

<NotesDialog bind:dialog={notesDialog} serialNumber={'20beb7c2-cffa'} notes={['One', 'Two', 'Three', 'Four', 'Five']} />

<SpecificationDialog bind:dialog={specDialog} serialNumber={'20beb7c2-cffa'} model={spec} />
