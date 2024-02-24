import { ZodError, z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { AuthEndpoints } from '$lib/apis/endpoints';
import { APP_KEY } from '$env/static/private';
import { getErrorMessage } from '$lib/helpers/errors';

const schema = z
	.object({
		email: z.string().email('Must be a valid email'),
		displayName: z.string().min(3, 'Name must contain at least 3 characters'),
		password: z.string().min(1, 'Password is required'),
		confirmedPassword: z.string().min(1, 'Confirmed passwords is required')
	})
	.refine((data) => data.password === data.confirmedPassword, {
		message: 'Passwords must match',
		path: ['confirmedPassword']
	});

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		try {
			const data = schema.parse({
				email: formData.get('email'),
				displayName: formData.get('displayName'),
				password: formData.get('password'),
				confirmedPassword: formData.get('confirmedPassword')
			});

			const response = await fetch(AuthEndpoints.signup, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: data.email,
					displayName: data.displayName,
					password: data.password,
					appKey: APP_KEY
				})
			});

			if (!response.ok) {
				const error = await response.json();
				return fail(400, {
					general: getErrorMessage(error)
				});
			}
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.formErrors.fieldErrors;

				return fail(400, {
					email: errors.email,
					displayName: errors.displayName,
					password: errors.password,
					confirmedPassword: errors.confirmedPassword
				});
			}
		}
	}
} satisfies Actions;
