import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';

const noAuthAllowed: Record<string, string> = {
	// '/auth/signin': '/login',
	'/login': '/login'
};

const authOptions = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
	pages: {
		signIn: '/login'
	}
});

const protectedHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();

	if (!session) {
		console.log('there is no session');

		if (noAuthAllowed[event.url.pathname]) {
			return await resolve(event);
		} else {
			console.log('redirect');
			throw redirect(303, `/auth/signin?callbackUrl=${event.url.pathname}`);
		}
	} else if (noAuthAllowed[event.url.pathname]) {
		throw redirect(307, '/');
	}

	console.log('retur', event.url.pathname);

	return await resolve(event);
};

export const handle = sequence(authOptions, protectedHandle);

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (event.url.pathname === '/') throw redirect(301, '/login');

// 	return await resolve(event);
// };
