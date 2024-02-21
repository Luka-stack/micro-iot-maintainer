import Google from '@auth/sveltekit/providers/google';
import Credentials from '@auth/sveltekit/providers/credentials';
import { error } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import { AuthEndpoints } from '$lib/apis/endpoints';
import type { AuthSession, AuthUser } from '$lib/auth.types';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, APP_KEY } from '$env/static/private';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [
		Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
		Credentials({
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
			authorize: async (credentials) => {
				if (!credentials.email || !credentials.password) {
					error(400, 'Wrong credentials');
				}

				const response = await fetch(AuthEndpoints.login, {
					method: 'POST',
					headers: {
						'Access-Control-Allow-Origin': 'true',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials.email,
						password: credentials.password,
						appKey: APP_KEY
					})
				});

				const responseJson = await response.json();

				if (!response.ok) {
					throw new Error('Test Error');
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
					name: user.name,
					appKey: APP_KEY
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
					throw new Error("Couldn't login");
				}

				(user as AuthUser).accessToken = responseJson.accessToken;
				(user as AuthUser).user = responseJson.user;
				(user as AuthUser).appKey = responseJson.appKey;
			}

			return true;
		},

		async jwt({ token, user }) {
			if (user) {
				return {
					...token,
					appKey: (user as AuthUser).appKey,
					accessToken: (user as AuthUser).accessToken,
					user: (user as AuthUser).user
				};
			}

			return token;
		},

		async session({ session, token }) {
			(session as unknown as AuthSession).appKey = token.appKey as string;
			(session as unknown as AuthSession).user = token.user as AuthSession['user'];
			(session as unknown as AuthSession).accessToken = token.accessToken as string;

			return session;
		}
	},
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/login',
		error: '/login'
	}
});
