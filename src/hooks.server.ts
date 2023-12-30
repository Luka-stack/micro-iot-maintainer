import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import Credentials from '@auth/core/providers/credentials';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle, error } from '@sveltejs/kit';
import { AuthEndpoints } from '$lib/apis/endpoints';
import type { AuthSession, AuthUser } from '$lib/auth.types';

const noAuthAllowed: Record<string, string> = {
	'/login': '/login'
};

const authOptions = SvelteKitAuth({
	providers: [
		Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
		Credentials({
			id: 'local-login',
			credentials: {
				email: {
					label: 'Email',
					type: 'text'
				},
				password: {
					label: 'Password',
					type: 'password'
				}
			},
			async authorize(credentials) {
				if (!credentials.email || !credentials.password) {
					error(400, 'Wrong credentials');
				}

				const response = await fetch(AuthEndpoints.login, {
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origin': 'true',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(credentials)
				});

				const responseJson = await response.json();

				if (!response.ok) {
					error(400, 'Wrong credentials');
				}

				return responseJson;
			}
		})
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === 'google') {
				const googleUser = {
					idToken: account.id_token,
					email: user.email,
					name: user.name
				};

				const response = await fetch(AuthEndpoints.providerLogin('google'), {
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origin': 'true',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(googleUser)
				});

				const responseJson = await response.json();

				if (!response.ok) {
					// TODO Throw an Error
					console.log('Error while logging');
					throw new Error("Couldn't login");
				}

				(user as AuthUser).accessToken = responseJson.accessToken;
				(user as AuthUser).user = responseJson.user;
			}

			return true;
		},

		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					accessToken: (user as AuthUser).accessToken,
					user: (user as AuthUser).user
				};
			}

			return token;
		},

		async session({ session, token }) {
			(session as AuthSession).user = token.user as AuthSession['user'];
			(session as AuthSession).accessToken = token.accessToken as string;

			return session;
		}
	},
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/login'
	}
});

const protectedHandle: Handle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();

	if (!session) {
		if (noAuthAllowed[event.url.pathname]) {
			return await resolve(event);
		} else {
			redirect(303, `/auth/signin?callbackUrl=${event.url.pathname}`);
		}
	} else if (noAuthAllowed[event.url.pathname]) {
		redirect(307, '/');
	}

	return await resolve(event);
};

export const handle = sequence(authOptions, protectedHandle);

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (event.url.pathname === '/') throw redirect(301, '/login');

// 	return await resolve(event);
// };
