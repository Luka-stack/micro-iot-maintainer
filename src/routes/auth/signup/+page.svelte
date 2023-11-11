<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	import loginBg from '$lib/images/loginBg.png';

	export let form: ActionData;
	let pending = false;

	function logIn() {
		pending = true;

		return async ({ update }: any) => {
			pending = false;
			await update();
		};
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
				<div class="w-full">
					<h2 class="w-full text-2xl italic text-center">Welcome to IoT Fox</h2>
					<h2 class="w-full text-base italic text-center text-slate-400">Register as a new maintainer</h2>
				</div>
			</div>

			<form method="post" use:enhance={logIn} class="grid gap-5">
				<div class="w-full max-w-xs form-control">
					<input
						name="email"
						type="email"
						placeholder="Type email..."
						class="w-full max-w-xs input input-bordered"
						class:input-error={form?.email}
					/>
					<p class="text-sm text-error">{form?.email || ''}</p>
				</div>

				<div class="w-full max-w-xs form-control">
					<input
						name="displayName"
						type="text"
						placeholder="Type display name..."
						class="w-full max-w-xs input input-bordered"
						class:input-error={form?.displayName}
					/>
					<p class="text-sm text-error">{form?.displayName || ''}</p>
				</div>

				<div class="w-full max-w-xs form-control">
					<input
						name="password"
						type="password"
						placeholder="Type password..."
						class="w-full max-w-xs input input-bordered"
						class:input-error={form?.password}
					/>
					<p class="text-sm text-error">{form?.password || ''}</p>
				</div>

				<div class="w-full max-w-xs form-control">
					<input
						name="confirmedPassword"
						type="password"
						placeholder="Confirm your password..."
						class="w-full max-w-xs input input-bordered"
						class:input-error={form?.confirmedPassword}
					/>
					<p class="text-sm text-error">{form?.confirmedPassword || ''}</p>
				</div>

				<button class="btn btn-neutral btn-block" type="submit" disabled={pending} aria-disabled={pending}>
					Register
				</button>
			</form>

			<div class="divider">OR</div>

			<div class="card-actions">
				<div class="flex items-baseline justify-center w-full space-x-1">
					<span class="text-sm"> Aleady have an account? </span>
					<a
						href="/auth/signin"
						class="text-sm text-blue-500 underline transition-all cursor-pointer hover:scale-105 underline-offset-2"
					>
						Log in here!
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
