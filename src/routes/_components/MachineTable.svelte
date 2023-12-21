<script lang="ts">
	import TableMenu from './TableMenu.svelte';
</script>

<div class="border rounded-md shadow-sm border-white/10 shadow-black">
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
				<th class="rounded-tr-md" />
			</tr>
		</thead>
		<tbody>
			<tr class="border-none">
				<th class="w-24"><img src={'machine.png'} alt="machine" class="w-full aspect-square" /></th>
				<td>f03afd24-b055</td>
				<td>Kawasaki</td>
				<td>Graber</td>
				<td>KWS-GR-1</td>
				<td>Broken</td>
				<td>{new Date().toLocaleDateString()}</td>
				<td>{new Date().toLocaleDateString()}</td>
				<td><TableMenu /></td>
			</tr>

			<tr class="border-none">
				<th class="w-24"><img src={'machine.png'} alt="machine" class="w-full aspect-square" /></th>
				<td>f03afd24-b055</td>
				<td>Kawasaki</td>
				<td>Graber</td>
				<td>KWS-GR-1</td>
				<td>Broken</td>
				<td>{new Date().toLocaleDateString()}</td>
				<td>{new Date().toLocaleDateString()}</td>
				<td><TableMenu /></td>
			</tr>

			<tr class="border-none">
				<th class="w-24"><img src={'machine.png'} alt="machine" class="w-full aspect-square" /></th>
				<td>f03afd24-b055</td>
				<td>Kawasaki</td>
				<td>Graber</td>
				<td>KWS-GR-1</td>
				<td>Broken</td>
				<td>{new Date().toLocaleDateString()}</td>
				<td>{new Date().toLocaleDateString()}</td>
				<td><TableMenu /></td>
			</tr>
		</tbody>
	</table>
</div>
