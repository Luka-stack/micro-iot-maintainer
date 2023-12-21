<script>
	import '../app.css';
	import logo from '$lib/images/logo.png';
</script>

<div class="flex flex-col h-screen p-4">
	<header class="flex items-center justify-between py-4">
		<img alt="Fox-IoT" src={logo} width="72" height="72" />

		<div class="flex space-x-4">
			<div class="flex flex-col justify-center">
				<p class="-mb-1 text-xs italic font-medium text-gray-500">Logged as</p>
				<p>maintainer@fox-iot.com</p>
			</div>
			<button class="btn btn-outline">Log Out</button>
		</div>
	</header>

	<slot />
</div>
