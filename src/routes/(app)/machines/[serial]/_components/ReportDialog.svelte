<script lang="ts">
	import { enhance } from '$app/forms';
	import { CheckSquare, Square } from 'lucide-svelte';

	export let errors: Record<string, { value: string; error: string }> | null;
	export let dialog: HTMLDialogElement;
	export let serialNumber: string;
	export let defects: string[] | null;

	const handleCheckboxChange = (event: Event, id: number) => {
		const target = event.target as HTMLInputElement;

		if (!defects || !defects.length) return;

		if (target.checked) {
			optionalDescription.push(defects[id]);
			selectedDefects.set(defects[id], true);
		} else {
			optionalDescription = optionalDescription.filter((note) => note !== defects![id]);
			selectedDefects.delete(defects[id]);
		}

		description = optionalDescription.join('\n');
	};

	const resetErrors = () => {
		errors = null;
	};

	let selectedDefects: Map<string, boolean> = new Map();
	let selectedTab = 1;
	let currentDate = new Date().toISOString().split('T')[0];
	let optionalDescription: string[] = [];
	let description = '';
</script>

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2" on:click={resetErrors}>✕</button>
		</form>

		<h3 class="text-lg font-bold">Reporting work for machine {serialNumber}</h3>

		<div class="space-y-5" class:hidden={selectedTab !== 1}>
			<p>
				This screen presents a list of issues reported by the machine operator. You can select the ones that you have
				addressed.
			</p>

			{#if !defects || defects.length === 0}
				<p class="text-center">No notes to show.</p>
			{:else}
				<ul
					class="p-2 overflow-y-auto rounded-md bg-base-300 max-h-60 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/40"
				>
					{#each defects as defect, id}
						<li class="flex items-center p-2 space-x-3">
							<label class="swap swap-rotate">
								<input
									type="checkbox"
									on:change={(e) => handleCheckboxChange(e, id)}
									checked={selectedDefects.has(defect)}
								/>
								<Square class="w-5 h-5 swap-off" />
								<CheckSquare class="w-5 h-5 swap-on" />
							</label>
							<p>{defect}</p>
						</li>
					{/each}
				</ul>
			{/if}

			<button on:click={() => (selectedTab = 2)} class="float-right btn btn-primary">Next</button>
		</div>

		<form
			method="POST"
			action="?/report"
			class="space-y-5"
			class:hidden={selectedTab !== 2}
			use:enhance={({ formData }) => {
				formData.append('defects', JSON.stringify(optionalDescription));
				formData.append('machine', serialNumber);

				return async ({ update, result }) => {
					await update({ reset: true, invalidateAll: true });

					if (result.status === 204) {
						dialog.close();
						selectedDefects = new Map();
						selectedTab = 1;
					}
				};
			}}
		>
			<p>Schedule the next maintenance, describe the work done, and click on the "Finish" button.</p>

			<label class="w-full form-control">
				<div class="label">
					<span class="label-text">Next maintenance</span>
				</div>
				<input
					name="nextMaintenance"
					type="date"
					class="w-full input input-bordered"
					class:input-error={errors?.nextMaintenance.error}
					value={errors?.nextMaintenance.value}
					min={currentDate}
				/>

				{#if errors?.nextMaintenance.error}
					<div class="label">
						<span class="label-text-alt text-error">{errors?.nextMaintenance.error}</span>
					</div>
				{/if}
			</label>

			<label class="form-control">
				<div class="label">
					<span class="label-text">Work description</span>
				</div>
				<textarea
					class="h-24 textarea textarea-bordered placeholder:text-slate-500"
					class:textarea-error={errors?.description.error}
					bind:value={description}
					name="description"
					placeholder="Type what you did..."
				/>
				{#if errors?.description.error}
					<div class="label">
						<span class="label-text-alt text-error">{errors?.description.error}</span>
					</div>
				{/if}
			</label>

			<div class="float-right space-x-2">
				<button type="button" class="btn" on:click={() => (selectedTab = 1)}>Back</button>
				<button type="submit" class="btn btn-primary">Finish</button>
			</div>
		</form>
	</div>

	<form method="dialog" class="cursor-default modal-backdrop">
		<button on:click={resetErrors} class="cursor-default" type="submit">Close</button>
	</form>
</dialog>
