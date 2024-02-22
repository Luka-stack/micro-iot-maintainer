<script lang="ts">
	import BasePagination from '$lib/components/BasePagination.svelte';
	import MachineTable from './_components/MachineTable.svelte';
	import SearchSidebar from './_components/SearchSidebar.svelte';

	export let data;
</script>

<main class="flex space-x-4 full-page">
	<section
		class="flex flex-col justify-between h-full p-4 border rounded-md shadow-sm w-72 main-gradient shadow-black border-white/10"
	>
		<SearchSidebar {...data.filters} />
	</section>

	<section class="flex flex-col flex-1 space-y-4">
		<MachineTable machines={data.machines} />
		<BasePagination pagination={data.pagination} />
	</section>
</main>
