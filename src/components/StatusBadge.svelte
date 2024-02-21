<script lang="ts">
	import clsx from 'clsx';

	export let status: string;
</script>

<div
	class={clsx(
		'px-2 py-1 text-xs text-center border w-28 rounded-badge',
		status === 'REPAIR' && 'border-error stripes-error',
		status === 'BROKEN' && 'border-error stripes-error',
		status === 'MAINTENANCE' && 'border-warning stripes-warning',
		status === 'IDLE' && 'border-slate-600 stripes-gray',
		status === 'WORKING' && 'border-success stripes-success'
	)}
>
	{status}
</div>
