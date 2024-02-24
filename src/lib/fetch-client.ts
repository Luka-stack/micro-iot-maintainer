type SvelteFetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export class RequestResponse<TData> {
	public fetchedData: TData | null;
	public messages: string[] = [];
	public code: number = 500;

	constructor(
		public hasError: boolean,
		data: TData | unknown
	) {
		if (hasError) {
			this.fetchedData = null;
			this.hanldeError(data);
		} else {
			this.fetchedData = data as TData;
		}
	}

	toPlainObject() {
		if (this.hasError) {
			return {
				error: true,
				code: this.code,
				messages: this.messages
			};
		}

		return {
			error: false,
			data: this.fetchedData
		};
	}

	private hanldeError(error: unknown) {
		if (error) {
			if (typeof error === 'object') {
				if ('message' in error) {
					if (typeof error.message === 'string') {
						this.messages.push(error.message);
					} else {
						this.messages = error.message as string[];
					}
				}

				if ('statusCode' in error) {
					this.code = error.statusCode as number;
				}
			}
		}
	}
}

async function fetchClient<TData>(
	svelteFatch: SvelteFetch,
	url: string,
	body: object | null,
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
	accessToken?: string
): Promise<RequestResponse<TData>> {
	const response = await svelteFatch(url, {
		method,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: body && JSON.stringify(body)
	});

	// No Content
	if (response.status === 204) {
		return new RequestResponse<TData>(false, null);
	}

	const responseJson = await response.json();

	if (!response.ok) {
		return new RequestResponse(true, responseJson);
	}

	return new RequestResponse<TData>(false, responseJson);
}

export async function getRequest<TData>(
	svelteFatch: SvelteFetch,
	url: string,
	token?: string
): Promise<RequestResponse<TData>> {
	return fetchClient<TData>(svelteFatch, url, null, 'GET', token);
}

export async function postRequest<TData>(
	svelteFatch: SvelteFetch,
	url: string,
	body: object | null,
	token?: string
): Promise<RequestResponse<TData>> {
	return fetchClient<TData>(svelteFatch, url, body, 'POST', token);
}
