<script lang="ts">
	import '../app.css';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import BaseError from '$lib/components/BaseError.svelte';
</script>

<BaseError
	title={$page.status === 404 || $page.status === 401 ? '404 - the page not found' : '500 - our server is on a break'}
>
	{#if $page.status === 404 || $page.status === 401}
		<div class="flex flex-col mt-10 space-y-4">
			<p class="text-lg">The page you are looking for might have been removed.</p>
			<button class="btn btn-primary btn-md" on:click={() => goto('/')}>GO TO HOMEPAGE</button>
		</div>
	{:else}
		<p class="mt-10 text-lg">Please hit 'relaod' on you browser in a minute to try again</p>
	{/if}
</BaseError>
