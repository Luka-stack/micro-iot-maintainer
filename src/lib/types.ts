export type RepairType = 'REPAIR' | 'MAINTENANCE';

export type Machine = {
	serialNumber: string;
	producent: string;
	status: string;
	type: {
		name: string;
		imageUrl: string;
	};

	model: {
		name: string;
		workBase: number;
		workRange: number;
		faultRate: number;
		maxRate: number;
		minRate: number;
		defaultRate: number;
	};

	maintainInfo: {
		defects: string[];
		priority: string;
		maintenance: string;
	};

	// TODO Don't send to to maintainer
	// assignedEmployee: string;

	// maintenances: RepairHistory[] | null;

	assignedMaintainer: string | null;

	lastStatusUpdate: string;

	productionRate: number;
};

export type RepairHistory = {
	maintainer: string;
	description: string;
	type: RepairType;
	date: string;
	scheduled: string;
	nextMaintenance: string;
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
