<script lang="ts">
	import { CheckSquare, Square } from 'lucide-svelte';

	export let dialog: HTMLDialogElement;
	export let serialNumber: string;
	export let notes: string[] | null;

	const handleCheckboxChange = (event: Event, id: number) => {
		const target = event.target as HTMLInputElement;

		if (!notes || !notes.length) return;

		if (target.checked) {
			optionalDescription.push(notes[id]);
		} else {
			optionalDescription = optionalDescription.filter((note) => note !== notes![id]);
		}

		description = optionalDescription.join('\n');
	};

	let selectedTab = 1;
	let currentDate = new Date().toISOString().split('T')[0];
	let optionalDescription: string[] = [];
	let description = '';
</script>

<dialog class="modal" bind:this={dialog}>
	<div class="modal-box">
		<form method="dialog">
			<button class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
		</form>

		<h3 class="text-lg font-bold">Reporting work for machine {serialNumber}</h3>

		<div class="space-y-5" class:hidden={selectedTab !== 1}>
			<p>
				This screen presents a list of issues reported by the machine operator. You can select the ones that you have
				addressed.
			</p>

			{#if !notes || notes.length === 0}
				<p class="text-center">No notes to show.</p>
			{:else}
				<ul
					class="p-2 overflow-y-auto rounded-md bg-base-300 max-h-60 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/40"
				>
					{#each notes as note, id}
						<li class="flex items-center p-2 space-x-3">
							<label class="swap swap-rotate">
								<input type="checkbox" on:change={(e) => handleCheckboxChange(e, id)} />
								<Square class="w-5 h-5 swap-off" />
								<CheckSquare class="w-5 h-5 swap-on" />
							</label>
							<p>{note}</p>
						</li>
					{/each}
				</ul>
			{/if}

			<button on:click={() => (selectedTab = 2)} class="float-right btn btn-primary">Next</button>
		</div>

		<form on:submit|preventDefault={() => {}} class="space-y-5" class:hidden={selectedTab !== 2}>
			<p>Schedule the next maintenance, describe the work done, and click on the "Finish" button.</p>

			<label class="w-full form-control">
				<div class="label">
					<span class="label-text">Next maintenance</span>
				</div>
				<input type="date" class="w-full input input-bordered" min={currentDate} />
			</label>

			<label class="form-control">
				<div class="label">
					<span class="label-text">Work description</span>
				</div>
				<textarea
					class="h-24 textarea textarea-bordered placeholder:text-slate-500"
					bind:value={description}
					placeholder="Type what you did..."
				/>
			</label>

			<div class="float-right space-x-2">
				<button class="btn" on:click={() => (selectedTab = 1)}>Back</button>
				<button type="submit" class="btn btn-primary">Finish</button>
			</div>
		</form>
	</div>

	<form method="dialog" class="cursor-default modal-backdrop">
		<button class="cursor-default">close</button>
	</form>
</dialog>
