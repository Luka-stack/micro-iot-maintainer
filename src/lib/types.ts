export type Machine = {
	serialNumber: string;
	producent: string;
	status: string;
	type: {
		name: string;
		imageUrl: string;
	};

	// TODO Don't need all of its data
	model: {
		name: string;
	};

	maintainInfo: {
		notes: string[];
		priority: string;
		maintenance: string;
	};

	// TODO Don't send to to maintainer
	// assignedEmployee: string;

	assignedMaintainer: string | null;

	//  TODO Don't send to mainteiner
	//  lastStatusUpdate: Date;

	// TODO Dont send to maintainer
	// productionRate: number;
};

export type Pagination = {
	count: number;
	offset: number;
	limit: number;
	total: number;
};

export type ProducentFilter = {
	name: string;
};

export type TypeFilter = {
	name: string;
	producents: string[];
};

export type ModelFilter = {
	name: string;
	producent: string;
	type: string;
};
