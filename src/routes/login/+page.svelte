<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { ZodError, z } from 'zod';

	import '../../app.css';

	import google from '$lib/images/google.png';
	import loginBg from '$lib/images/loginBg.png';

	const callbackUrl = $page.url.searchParams.get('callbackUrl') || '/';
	const authError = $page.url.searchParams.get('error');
	let pending = false;
	let errors: { email?: string; password?: string } = {};

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		pending = true;

		try {
			const data = new FormData(event.currentTarget);
			const payload = z
				.object({
					email: z.string().email('Must be a valid email'),
					password: z.string().min(1, 'Password is required')
				})
				.parse({
					email: data.get('email') as string,
					password: data.get('password') as string
				});

			signIn('credentials', {
				email: payload.email,
				password: payload.password,
				callbackUrl
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const zodErrors = error.formErrors.fieldErrors;

				errors = {
					email: zodErrors.email?.join(),
					password: zodErrors.password?.join()
				};
			}

			pending = false;
		}
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

			{#if authError}
				<div class="mb-2 border alert border-error bg-error/10 text-error">
					<p>Wrong credentials!</p>
				</div>
			{/if}

			<form on:submit|preventDefault={handleSubmit} class="grid gap-5" method="post">
				<div class="w-full max-w-xs form-control">
					<input
						name="email"
						type="email"
						placeholder="Type email..."
						class="w-full max-w-xs input input-bordered"
						class:input-error={errors?.email}
					/>
					<p class="text-sm text-error">{errors?.email || ''}</p>
				</div>

				<div class="w-full max-w-xs form-control">
					<input
						name="password"
						type="password"
						placeholder="Type password..."
						class="w-full max-w-xs input input-bordered"
						class:input-error={errors?.password}
					/>
					<p class="text-sm text-error">{errors?.password || ''}</p>
				</div>

				<button class="btn btn-block btn-neutral disabled:bg-neutral" type="submit" disabled={pending}>
					{#if !pending}
						Log In
					{:else}
						<span class="loading loading-spinner loading-md"></span>
					{/if}
				</button>
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
						href="/signup"
						class="text-sm text-blue-500 underline transition-all cursor-pointer hover:scale-105 underline-offset-2"
					>
						Register for free!
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
