import { ZodError, z } from 'zod';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

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

		await new Promise((res) => setTimeout(res, 5000));

		try {
			schema.parse({
				email: formData.get('email'),
				displayName: formData.get('displayName'),
				password: formData.get('password'),
				confirmedPassword: formData.get('confirmedPassword'),
				role: 'maintainer'
			});
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
