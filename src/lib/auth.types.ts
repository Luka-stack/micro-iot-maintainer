export type AuthUser = {
	user?: {
		displayName: string;
		email: string;
		role: string;
	};
	appKey?: string;
	accessToken?: string;
	newUser?: boolean;
};

export type AuthSession = {
	user?: {
		displayName: string;
		email: string;
		role: string;
	};
	accessToken?: string;
	appKey?: string;
};
