import { Injectable } from '@angular/core';

interface IException {
	startDate: string;
	errorCode: number;
	typeOfError: string;
	detail: string;
}

@Injectable()
class ExceptionsDataService {
	private data: IException[];

	constructor() {
		this.data = [
			{
				detail: `The server cannot or will not process the
                            request due to an apparent client error
                            (e.g., malformed request syntax, size too large, invalid
                            request message framing, or deceptive request routing).`,
				errorCode: 400,
				startDate: '03/28/2017 09:25:13',
				typeOfError: 'Bad Request',
			},
			{
				detail: `The response must include a
                            WWW-Authenticate header field containing
                            a challenge applicable to the requested resource.`,
				errorCode: 401,
				startDate: '02/18/2017 20:36:11',
				typeOfError: 'Unauthorized',
			},
			{
				detail: `The request was valid,
                             but the server is refusing action.
                              The user might not have the necessary permissions
                              for a resource, or may need an account of some sort.`,
				errorCode: 403,
				startDate: '06/12/2017 12:12:59',
				typeOfError: 'Forbidden',
			},
			{
				detail: `The requested resource could
                             not be found but may be available in the future.
                             Subsequent requests by the client are permissible.`,
				errorCode: 404,
				startDate: '02/07/2017 21:25:43',
				typeOfError: 'Not Found',
			},
			{
				detail: `A request method is not supported for
                            the requested resource; for example, a GET request
                            on a form that requires data to be presented via POST,
                            or a PUT request on a read-only resource.`,
				errorCode: 405,
				startDate: '05/29/2017 09:27:12',
				typeOfError: 'Method Not Allowed',
			},
			{
				detail: `The server timed out waiting
                             for the request. According to HTTP specifications:
                              "The client did not produce a request within the time
                               that the server was prepared to wait. The client MAY repeat
                                the request without modifications at any later time."`,
				errorCode: 408,
				startDate: '03/03/2017 15:35:02',
				typeOfError: 'Request Timeout',
			},
			{
				detail: `A server operator has received
                             a legal demand to deny access to a resource
                             or to a set of resources that includes the requested resource.`,
				errorCode: 451,
				startDate: '04/09/2017 17:22:23',
				typeOfError: 'Unavailable For Legal Reasons',
			},
			{
				detail: `A generic error message, given when
                            an unexpected condition was encountered and
                            no more specific message is suitable.`,
				errorCode: 500,
				startDate: '05/13/2017 15:56:19',
				typeOfError: 'Internal Server Error',
			},
			{
				detail: `The server either does not recognize the
                            request method, or it lacks the ability to fulfil the request.
                             Usually this implies future availability (e.g., a new feature of a web-service API).`,
				errorCode: 501,
				startDate: '04/04/2017 18:23:28',
				typeOfError: 'Not Implemented',
			},
			{
				detail: `The client needs to authenticate to gain network access.
                            Intended for use by intercepting proxies used to control access to the network.`,
				errorCode: 511,
				startDate: '07/26/2016 11:59:59',
				typeOfError: 'Network Authentication Required',
			},
		];
	}

	public getData(): IException[] {
		return this.data;
	}
}

export { IException, ExceptionsDataService };
