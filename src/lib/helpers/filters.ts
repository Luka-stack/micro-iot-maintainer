export function getMachineFilters(serialNumber: string, producent: string, type: string, model: string, page: string) {
	const query = new URLSearchParams();

	query.set('page', page);

	if (serialNumber) {
		query.set('serialNumber', serialNumber);
	}

	if (producent) {
		query.set('producents', producent);
	}

	if (type) {
		query.set('types', type);
	}

	if (model) {
		query.set('models', model);
	}

	return query.toString();
}

// export function getMachinePaginationUrl(page: number) {}
