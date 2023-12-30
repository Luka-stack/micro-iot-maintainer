<script lang="ts">
	import MachineTable from './_components/MachineTable.svelte';
	import SearchSidebar from './_components/SearchSidebar.svelte';
	import BasePagination from '$lib/components/BasePagination.svelte';

	export let data;

	$: machines = data.machines;
</script>

<main class="flex flex-1 space-x-4 h-[500px]">
	<!-- <button on:click={() => (machines = [])}>Half Data</button> -->

	<section
		class="flex flex-col justify-between h-full p-4 border rounded-md shadow-sm w-72 main-gradient shadow-black border-white/10"
	>
		<SearchSidebar {...data.filters} />
	</section>

	<section class="flex flex-col flex-1 space-y-4">
		<MachineTable {machines} />
		<BasePagination pagination={data.pagination} />
	</section>
</main>
