<script lang="ts">
	import { enhance } from '$app/forms';

	export let dialog: HTMLDialogElement;
	export let serialNumber: string | undefined;
</script>

<dialog class="modal" bind:this={dialog}>
	<div class="max-w-2xl modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
		</form>
		<h3 class="text-lg font-bold">Remove me as machine {serialNumber} maintainer</h3>

		<p class="">This action will remove you from your role as a maintainer for the machine. Do you want to proceed?</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>

			<form
				method="post"
				action="?/unassign"
				use:enhance={() => {
					return async ({ update }) => {
						await update();
						dialog.close();
					};
				}}
			>
				<input type="hidden" name="machine" value={serialNumber} />

				<button class="btn btn-primary">Unassign</button>
			</form>
		</div>
	</div>
</dialog>
