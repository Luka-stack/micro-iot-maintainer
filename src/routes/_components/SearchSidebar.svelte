<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getMachineFilters } from '$lib/helpers/filters';
	import type { ModelFilter, ProducentFilter, TypeFilter } from '$lib/types';
	import { onMount } from 'svelte';

	export let producents: ProducentFilter[];
	export let types: TypeFilter[];
	export let models: ModelFilter[];

	let serialNumber = '';
	let producent = '';
	let type = '';
	let model = '';
	let maintainer = '';
	let priority = '';
	let status = '';
	let nextMaintenance = '';
	let previousMaintenance = '';

	let availableTypes = types;
	let availableModels = models;

	onMount(() => {
		serialNumber = $page.url.searchParams.get('serialNumber') || '';
		producent = $page.url.searchParams.get('producents') || '';
		type = $page.url.searchParams.get('types') || '';
		model = $page.url.searchParams.get('models') || '';
		maintainer = $page.url.searchParams.get('maintainer') ? 'other' : '';
		priority = $page.url.searchParams.get('priority')?.toUpperCase() || '';
		status = $page.url.searchParams.get('status')?.toUpperCase() || '';
	});

	function handleProducerChange() {
		type = '';
		model = '';
		availableTypes = producent ? types.filter((type) => type.producents.includes(producent)) : types;
		handleTypeChange();
	}

	function handleTypeChange() {
		model = '';

		if (!producent && !type) {
			availableModels = models;
			return;
		}

		if (type) {
			availableModels = models.filter(
				(model) => model.type === type && (producent ? model.producent === producent : true)
			);

			return;
		}

		availableModels = models.filter((model) => model.producent === producent);
	}

	function handleSearch() {
		const pageParam = $page.url.searchParams.get('page') || '1';

		const url = getMachineFilters(serialNumber, producent, type, model, status, priority, pageParam, maintainer);
		goto(`?${url}`);
	}

	function validator(_node: HTMLInputElement, _: string) {
		return {
			update(uvalue: any) {
				if (isNaN(uvalue)) {
					nextMaintenance = previousMaintenance;
				} else {
					nextMaintenance = uvalue;
					previousMaintenance = uvalue;
				}
			}
		};
	}
</script>

<div class="flex flex-col space-y-6">
	<select class="w-full max-w-xs select select-md select-bordered" bind:value={maintainer}>
		<option selected value="">My assignments</option>
		<option value="other">Not assigned machines</option>
	</select>

	<select class="w-full max-w-xs select select-md select-bordered" bind:value={status}>
		<option disabled selected>Status</option>
		<option value="">All</option>
		<option value="BROKEN">Broken</option>
		<option value="MAINTENANCE">Maintenance</option>
	</select>

	<select class="w-full max-w-xs select select-md select-bordered" bind:value={priority}>
		<option disabled selected>Priority</option>
		<option value="">All</option>
		<option value="HIGH">High</option>
		<option value="NORMAL">Normal</option>
		<option value="LOW">Low</option>
	</select>

	<input
		use:validator={nextMaintenance}
		bind:value={nextMaintenance}
		type="text"
		class="w-full max-w-xs input input-bordered input-md"
		placeholder="Next maintenance"
	/>

	<div class="text-sm divider">Advanced search</div>

	<input
		bind:value={serialNumber}
		type="text"
		placeholder="Serial number"
		class="w-full max-w-xs input input-bordered input-md"
	/>

	<select
		bind:value={producent}
		on:change={handleProducerChange}
		class="w-full max-w-xs select select-md select-bordered"
	>
		<option disabled selected value="">Machine producent</option>
		<option value="">All</option>
		{#each producents as prod}
			<option>{prod.name}</option>
		{/each}
	</select>

	<select bind:value={type} on:change={handleTypeChange} class="w-full max-w-xs select select-md select-bordered">
		<option disabled selected value="">Machine type</option>
		<option value="">All</option>
		{#each availableTypes as type}
			<option value={type.name}>{type.name}</option>
		{/each}
	</select>

	<select bind:value={model} class="w-full max-w-xs select select-md select-bordered">
		<option disabled selected value="">Machine model</option>
		<option value="">All</option>
		{#each availableModels as model}
			<option>{model.name}</option>
		{/each}
	</select>
</div>

<button
	class="bg-blue-900 border-white/10 hover:border-white/10 btn-md btn grayscale-[40%] hover:bg-blue-900 hover:grayscale-0"
	on:click={handleSearch}>Search</button
>
