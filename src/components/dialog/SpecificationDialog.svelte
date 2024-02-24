<script lang="ts">
	import type { Machine } from '$lib/types';

	export let dialog: HTMLDialogElement;
	export let serialNumber: string | undefined;
	export let model: Machine['model'];
</script>

<dialog class="modal" bind:this={dialog}>
	<div class="max-w-2xl modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
		</form>

		<h3 class="text-lg font-bold">Machine {serialNumber} specifications</h3>
		<p>Machine specifications are displayed below for your reference.</p>

		<section class="flex mt-5 space-x-10">
			<ul class="grid w-1/2 grid-cols-3 p-2 border rounded-md gap-y-2 border-white/10 bg-base-300">
				<p class="col-span-2">Default Rate</p>
				<p class="text-right">{model.defaultRate} [s]</p>
				<p class="col-span-2">Minimum Rate</p>
				<p class="text-right">{model.minRate} [s]</p>
				<p class="col-span-2">Maximum Rate</p>
				<p class="text-right">{model.maxRate} [s]</p>
			</ul>

			<div class="grid w-1/2 grid-cols-3 p-2 border rounded-md border-white/10 bg-base-300 gap-y-2">
				<p class="col-span-2">Fault Indicator</p>
				<p class="text-right">{model.faultRate} [%]</p>
				<p class="col-span-2">Productivity</p>
				<p class="text-right">{model.workBase} [s]</p>
				<p class="col-span-2">Productivity Spread</p>
				<p class="text-right">{model.workRange} [s]</p>
			</div>
		</section>

		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
