export function getMachineFilters(
	serialNumber: string,
	producent: string,
	type: string,
	model: string,
	status: string,
	priority: string,
	page: string,
	maintainer: string
) {
	const query = new URLSearchParams();

	query.set('page', page);

	if (maintainer) {
		query.set('maintainer', maintainer);
	}

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

	if (priority) {
		query.set('priority', priority);
	}

	if (status) {
		query.set('status', status);
	}

	return query.toString();
}

// export function getMachinePaginationUrl(page: number) {}
