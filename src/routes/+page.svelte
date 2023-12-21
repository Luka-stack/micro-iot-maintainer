<script lang="ts">
	import MachineTable from './_components/MachineTable.svelte';
	import SearchSidebar from './_components/SearchSidebar.svelte';
</script>

<main class="flex flex-1 space-x-4">
	<section
		class="flex flex-col justify-between h-full p-4 border rounded-md shadow-sm w-72 main-gradient shadow-black border-white/10"
	>
		<SearchSidebar />
	</section>

	<section class="flex flex-col flex-1 space-y-4">
		<MachineTable />

		<div class="justify-end join">
			<button class="border border-white/10 btn btn-sm join-item">Prev</button>
			<button class="border border-white/10 btn btn-sm join-item">1</button>
			<button class="border border-white/10 btn btn-sm join-item">...</button>
			<button class="border border-white/10 btn btn-sm join-item">3</button>
			<button class="border border-white/10 btn btn-sm join-item">Next</button>
		</div>
	</section>
</main>
