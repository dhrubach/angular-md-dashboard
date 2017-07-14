import { Injectable } from '@angular/core';

interface IDetail {
	errorCode: number;
	extra: any[];
	fileName: string;
	message: string;
	timestamp: string;
	trace: string;
}

@Injectable()
class DetailPanelService {

	public data: IDetail[];

	constructor() {
		this.data = [
			{
				errorCode: 400,
				extra: [],
				fileName: 'NA',
				message: 'invalid request',
				timestamp: '06/13/2017 13:23:34',
				trace: `
					at fooClass.methodOne()
					at barClass.methodTwo()
					at bazClass.methodThree()
				`,
			},
			{
				errorCode: 401,
				extra: [],
				fileName: 'NA',
				message: 'authentication failed for user',
				timestamp: '04/22/2017 06:12:12',
				trace: '',
			},
			{
				errorCode: 500,
				extra: [{ exception: 'NullReferenceException' }],
				fileName: 'UserService.cs',
				message: 'cannot invoke method on a null object',
				timestamp: '02/12/2017 03:03:23',
				trace: `
					at fooClass.methodOne()
					at barClass.methodTwo()
					at bazClass.methodThree()
				`,
			},
			{
				errorCode: 401,
				extra: [{ user: 'TEST01' }],
				fileName: 'NA',
				message: 'authentication failed for user',
				timestamp: '01/11/2017 12:23:34',
				trace: '',
			},
			{
				errorCode: 400,
				extra: [],
				fileName: 'NA',
				message: 'invalid request',
				timestamp: '06/11/2017 17:30:31',
				trace: '',
			},
			{
				errorCode: 500,
				extra: [{ exception: 'BufferOverflowException' }],
				fileName: 'FileUpload.cs',
				message: 'uploaded file exceeds maximum size of 2 MB',
				timestamp: '06/22/2017 15:23:33',
				trace: `
					at fooClass.methodOne()
					at barClass.methodTwo()
					at bazClass.methodThree()
				`,
			},
			{
				errorCode: 500,
				extra: [{ exception: 'HttpException' }],
				fileName: 'HttpClient.cs',
				message: 'unable to connect to remote host',
				timestamp: '01/12/2017 10:10:10',
				trace: `
					at fooClass.methodOne()
					at barClass.methodTwo()
					at bazClass.methodThree()
				`,
			},
			{
				errorCode: 404,
				extra: [],
				fileName: 'favicon.ico',
				message: 'requested resource unavailable',
				timestamp: '05/10/2017 16:12:12',
				trace: `
					at fooClass.methodOne()
					at barClass.methodTwo()
					at bazClass.methodThree()
				`,
			},
			{
				errorCode: 500,
				extra: [{ exception: 'DbConnectionException' }],
				fileName: 'DbExecute.cs',
				message: 'unknown exception thrown by database server',
				timestamp: '04/12/2017 06:03:23',
				trace: `
					at fooClass.methodOne()
					at barClass.methodTwo()
					at bazClass.methodThree()
				`,
			},
			{
				errorCode: 401,
				extra: [{ user: 'TEST04' }],
				fileName: 'NA',
				message: 'authentication failed for user',
				timestamp: '06/20/2017 12:30:34',
				trace: `
					at fooClass.methodOne()
					at barClass.methodTwo()
					at bazClass.methodThree()
				`,
			},
		];
	}

	public getData(): IDetail[] {
		return this.data;
	}
}

export { DetailPanelService, IDetail };
