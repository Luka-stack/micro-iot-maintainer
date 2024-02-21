export function getErrorMessage(error: unknown): string {
	if (error) {
		if (typeof error === 'object') {
			if ('message' in error) {
				if (typeof error.message === 'string') {
					return error.message;
				}

				return (error.message as string[]).join(', ');
			}
		}
	}

	return 'Unkown error occurred.';
}
