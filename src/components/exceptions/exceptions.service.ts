import { Injectable } from '@angular/core';

import { IDetail } from './detail-panel/detail-panel.service';

interface IException {
	description: string;
	errorCode: number;
	childRecords: IDetail[];
	typeOfError: string;
}

@Injectable()
class ExceptionsDataService {

	private data: IException[];

	constructor() {
		this.data = [
			{
				childRecords: [],
				description: `
					The server cannot or will not process the
                    request due to an apparent client error
					(e.g., malformed request syntax, size too large, invalid
					request message framing, or deceptive request routing).
				`,
				errorCode: 400,
				typeOfError: 'Bad Request',
			},
			{
				childRecords: [],
				description: `
					The response must include a WWW-Authenticate header field containing
					a challenge applicable to the requested resource.
				`,
				errorCode: 401,
				typeOfError: 'Unauthorized',
			},
			{
				childRecords: [],
				description: `
					The request was valid, but the server is refusing action.
					The user might not have the necessary permissions for a resource,
					or may need an account of some sort.
				`,
				errorCode: 403,
				typeOfError: 'Forbidden',
			},
			{
				childRecords: [],
				description: `
					The requested resource could not be found but may be available in the future.
					Subsequent requests by the client are permissible.
				`,
				errorCode: 404,
				typeOfError: 'Not Found',
			},
			{
				childRecords: [],
				description: `
					A request method is not supported for the requested resource;
					for example, a GET request on a form that requires data to be
					presented via POST, or a PUT request on a read-only resource.
				`,
				errorCode: 405,
				typeOfError: 'Method Not Allowed',
			},
			{
				childRecords: [],
				description: `The client must first authenticate itself with the proxy`,
				errorCode: 407,
				typeOfError: 'Proxy Authentication Required',
			},
			{
				childRecords: [],
				description: `
					The server timed out waiting for the request. According to HTTP specifications:
					"The client did not produce a request within the time that the server
					was prepared to wait. The client MAY repeat the request without
					modifications at any later time."
				`,
				errorCode: 408,
				typeOfError: 'Request Timeout',
			},
			{
				childRecords: [],
				description: `
					The server is refusing to service the request because the entity
					of the request is in a format not supported by the requested
					resource for the requested method.
				`,
				errorCode: 415,
				typeOfError: 'Unsupported Media Type',
			},
			{
				childRecords: [],
				description: `
					A server operator has received a legal demand to deny access
					to a resource or to a set of resources that includes the requested
					resource.
				`,
				errorCode: 451,
				typeOfError: 'Unavailable For Legal Reasons',
			},
			{
				childRecords: [],
				description: `
					A generic error message, given when an unexpected condition
					was encountered and no more specific message is suitable.`,
				errorCode: 500,
				typeOfError: 'Internal Server Error',
			},
			{
				childRecords: [],
				description: `
					The server either does not recognize the request method, or it
					lacks the ability to fulfil the request. Usually this implies future
					availability (e.g., a new feature of a web-service API).`,
				errorCode: 501,
				typeOfError: 'Not Implemented',
			},
			{
				childRecords: [],
				description: `
					The server, while acting as a gateway or proxy, received an invalid
					response from the upstream server it accessed in attempting to
					fulfill the request.`,
				errorCode: 502,
				typeOfError: 'Bad Gateway',
			},
			{
				childRecords: [],
				description: `
					The client needs to authenticate to gain network access. Intended for
					use by intercepting proxies used to control access to the network.
				`,
				errorCode: 511,
				typeOfError: 'Network Authentication Required',
			},
		];
	}

	public getData(): IException[] {
		return this.data;
	}
}

export { IException, ExceptionsDataService };
