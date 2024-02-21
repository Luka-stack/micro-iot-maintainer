<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { Toaster } from 'svelte-sonner';

	import '../../app.css';
	import logo from '$lib/images/logo.png';

	export let data;
</script>

<Toaster richColors theme="dark" />

<div class="flex flex-col p-4 pt-0">
	<header class="flex items-center justify-between py-4">
		<div class="flex items-center space-x-10">
			<img alt="Fox-IoT" src={logo} width="72" height="72" />

			<ul class="flex space-x-5">
				<li>
					<a href="/" class="px-5 py-2 text-lg rounded-md main-gradient-hover" data-sveltekit-preload-data>Home</a>
				</li>
				<li>
					<a href="/" class="px-5 py-2 text-lg rounded-md main-gradient-hover" data-sveltekit-preload-data>My history</a
					>
				</li>
			</ul>
		</div>

		<div class="flex items-center space-x-4">
			<div class="flex flex-col justify-center">
				<p class="-mb-1 text-xs italic font-medium text-gray-500">Logged as</p>
				<p>{data.user?.email}</p>
			</div>
			<button on:click|once={() => signOut()} class="btn btn-sm btn-outline">Log Out</button>
		</div>
	</header>

	<slot />
</div>
