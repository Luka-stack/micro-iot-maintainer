<script lang="ts">
	import { page } from '$app/stores';
	import type { Pagination } from '$lib/types';
	import { getPaginationRange } from '$lib/helpers/pagination';

	export let pagination: Pagination;

	$: getUrl = (page: number) => {
		const params = new URLSearchParams($page.url.searchParams);
		params.set('page', page.toString());
		return `?${params.toString()}`;
	};
	$: hasPrev = pagination.offset > 0;
	$: hasNext = pagination.total > pagination.offset * pagination.count;
	$: paginationRange = getPaginationRange(pagination.total, pagination.limit, pagination.offset + 1);
</script>

{#if paginationRange.length !== 1}
	<div class="justify-end join">
		{#if hasPrev}
			<a
				data-sveltekit-preload-code
				href={getUrl(pagination.offset)}
				class="border border-white/10 btn btn-sm join-item"
			>
				Prev
			</a>
		{/if}

		{#each paginationRange as page}
			{#if page === -1}
				<p class="border pointer-events-none border-white/10 btn btn-sm join-item">...</p>
			{:else}
				<a
					class="border border-white/10 btn btn-sm join-item"
					class:btn-neutral={pagination.offset + 1 === page}
					class:pointer-events-none={pagination.offset + 1 === page}
					data-sveltekit-preload-code
					href={getUrl(page)}
				>
					{page}
				</a>
			{/if}
		{/each}

		{#if hasNext}
			<a
				data-sveltekit-preload-code
				href={getUrl(pagination.offset + 2)}
				class="border border-white/10 btn btn-sm join-item">Next</a
			>
		{/if}
	</div>
{/if}
