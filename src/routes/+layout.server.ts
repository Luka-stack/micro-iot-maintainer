import type { AuthSession } from '$lib/auth.types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const session = (await locals.getSession()) as AuthSession | null;

	return {
		user: session?.user
	};
};
