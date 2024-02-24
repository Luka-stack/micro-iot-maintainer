const AUTH_SERVER = 'http://localhost:5001/api';
const MACHINE_SERVER = 'http://localhost:5000/api';

export const AuthEndpoints = {
	signup: `${AUTH_SERVER}/signup`,
	login: `${AUTH_SERVER}/login`,
	providerLogin: (provider: string) => `${AUTH_SERVER}/login/${provider}`
};

export const MiscEndpoints = {
	filters: `${AUTH_SERVER}/misc/filters`
};

export const MachineEndpoints = {
	findMany: (offset: number, filter?: string) =>
		`${MACHINE_SERVER}/machines?limit=10&offset=${offset}${filter ? `&${filter}` : ''}`,
	findOne: (serialNum?: string) => `${MACHINE_SERVER}/machines/${serialNum}`,
	assign: (serialNum?: string) => `${MACHINE_SERVER}/machines/${serialNum}/assign-maintainer`,
	unassign: (serialNum?: string) => `${MACHINE_SERVER}/machines/${serialNum}/unassign-maintainer`,
	history: (serialNum?: string) => `${MACHINE_SERVER}/machines/${serialNum}/history`,
	report: (serialNum?: string) => `${MACHINE_SERVER}/machines/${serialNum}/report-maintenance`
};
