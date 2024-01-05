export type RepairType = 'REPAIR' | 'MAINTENANCE';

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
		workBase: number;
		workRange: number;
		faultRate: number;
		maxRate: number;
		minRate: number;
		defaultRate: number;
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

export type RepairHistory = {
	serialNumber: string;
	maintainer: string;
	description: string;
	type: RepairType;

	date: string;
	nextSchedule: string;
	lastSchedule: string;
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
