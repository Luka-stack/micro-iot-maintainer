<script lang="ts">
	import { ChevronsDown, ChevronsUp, Minus } from 'lucide-svelte';

	export let priority: string;
</script>

{#if priority === 'NORMAL'}
	<Minus class="w-10 h-10 mx-auto" />
{:else if priority === 'LOW'}
	<ChevronsDown class="w-8 h-8 mx-auto text-primary" />
{:else if priority === 'HIGH'}
	<ChevronsUp class="w-8 h-8 mx-auto text-error" />
{/if}
