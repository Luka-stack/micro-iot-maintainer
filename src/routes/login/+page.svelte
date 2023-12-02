<script>
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	import google from '$lib/images/google.png';
	import loginBg from '$lib/images/loginBg.png';

	const callbackUrl = $page.url.searchParams.get('callbackUrl') || '/';

	console.log(callbackUrl);

	function handleSubmit() {
		console.log('Form has been submited');
	}
</script>

<div class="absolute z-0">
	<picture>
		<img src={loginBg} alt="" class="w-screen h-screen blur-sm" />
	</picture>
</div>

<div class="z-10 grid items-center justify-center h-screen">
	<div class="shadow-md card card-normal card-bordered w-96 bg-base-100">
		<div class="card-body">
			<div class="card-title">
				<h2 class="w-full text-2xl italic text-center">Welcome to IoT Fox Mainatiners</h2>
			</div>

			<form on:submit|preventDefault={handleSubmit} class="grid gap-5">
				<div class="w-full max-w-xs form-control">
					<input name="email" type="email" placeholder="Type email..." class="w-full max-w-xs input input-bordered" />
				</div>

				<div class="w-full max-w-xs form-control">
					<input
						name="password"
						type="password"
						placeholder="Type password..."
						class="w-full max-w-xs input input-bordered"
					/>
				</div>

				<button class="btn btn-block btn-neutral" type="submit"> Log In </button>
			</form>

			<div class="divider">OR</div>

			<div class="card-actions">
				<button class="btn btn-block btn-neutral" on:click|once={() => signIn('google', { callbackUrl })}>
					<picture>
						<img src={google} alt="Google" class="w-5 mr-2" />
					</picture>
					Log In with Google
				</button>

				<div class="flex items-baseline justify-center w-full space-x-1">
					<span class="text-sm"> You don't have account? </span>
					<a
						href="/auth/signup"
						class="text-sm text-blue-500 underline transition-all cursor-pointer hover:scale-105 underline-offset-2"
					>
						Register for free!
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
