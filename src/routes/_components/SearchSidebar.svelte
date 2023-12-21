<div class="flex flex-col space-y-6">
	<select class="w-full max-w-xs select select-md select-bordered">
		<option disabled selected>Status</option>
		<option>All</option>
		<option>Broken</option>
		<option>Not broken</option>
	</select>

	<select class="w-full max-w-xs select select-md select-bordered">
		<option disabled selected>Priority</option>
		<option>All</option>
		<option>High</option>
		<option>Normal</option>
		<option>Low</option>
	</select>

	<div class="text-sm divider">Advanced search</div>

	<input type="text" placeholder="Serial number" class="w-full max-w-xs input input-bordered input-md" />

	<select class="w-full max-w-xs select select-md select-bordered">
		<option disabled selected>Machine producent</option>
		<option>All</option>
		<option>A</option>
		<option>B</option>
	</select>

	<select class="w-full max-w-xs select select-md select-bordered">
		<option disabled selected>Machine type</option>
		<option>All</option>
		<option>High</option>
		<option>Normal</option>
		<option>Low</option>
	</select>

	<select class="w-full max-w-xs select select-md select-bordered">
		<option disabled selected>Machine model</option>
		<option>All</option>
		<option>High</option>
		<option>Normal</option>
		<option>Low</option>
	</select>
</div>

<button class="border-white/10 btn-md btn">Search</button>
