const AUTH_SERVER = 'http://localhost:5001/api';

export const AuthEndpoints = {
	signup: `${AUTH_SERVER}/signup`,
	login: `${AUTH_SERVER}/login`,
	providerLogin: (provider: string) => `${AUTH_SERVER}/login/${provider}`
};
