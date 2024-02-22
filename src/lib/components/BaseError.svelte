<script lang="ts">
	export let title: string;
</script>

<main class="flex flex-col items-center justify-center">
	<h1 class="text-[15rem] font-light">OOPS!</h1>
	<h3 class="p-2 pb-0 -mt-[7.5rem] text-3xl uppercase bg-[#181A1B] shadow-md rounded-md">
		{title}
	</h3>

	<slot />
</main>
