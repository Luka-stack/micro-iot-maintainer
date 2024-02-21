import { sequence } from '@sveltejs/kit/hooks';
import type { AuthSession } from '$lib/auth.types';
import { handle as AuthHandle } from './auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { APP_KEY, ADMIN_APP_KEY } from '$env/static/private';

const noAuthAllowed: Record<string, string> = {
	'/login': '/login',
	'/signup': '/signup'
};

const protectedHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.auth();
	const canAccess = (session as AuthSession)?.appKey === APP_KEY || (session as AuthSession)?.appKey === ADMIN_APP_KEY;

	if (!session || !canAccess) {
		if (noAuthAllowed[event.url.pathname]) {
			return await resolve(event);
		} else {
			redirect(303, `/login?callbackUrl=${event.url.pathname}`);
		}
	} else if (noAuthAllowed[event.url.pathname]) {
		redirect(307, '/');
	}

	return await resolve(event);
};

export const handle = sequence(AuthHandle, protectedHandle);
