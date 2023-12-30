<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	import '../app.css';
	import logo from '$lib/images/logo.png';

	export let data;
</script>

<div class="flex flex-col h-screen p-4 pt-0">
	<header class="flex items-center justify-between py-4">
		<img alt="Fox-IoT" src={logo} width="72" height="72" />

		<div class="flex space-x-4">
			<div class="flex flex-col justify-center">
				<p class="-mb-1 text-xs italic font-medium text-gray-500">Logged as</p>
				<p>{data.user?.email}</p>
			</div>
			<button on:click|once={() => signOut()} class="btn btn-outline">Log Out</button>
		</div>
	</header>

	<slot />
</div>
