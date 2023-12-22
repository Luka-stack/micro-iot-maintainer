<script lang="ts">
	import type { Machine } from '$lib/types';
	import TableMenu from './TableMenu.svelte';

	export let machines: Machine[] = [];
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
					<td><TableMenu position={index} /></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
