import { Injectable } from '@angular/core';

import * as moment from 'moment';

interface IUser {
	user: string;
	created: string;
	expires: string;
	access: string;
	status: string;
	remaining: string;
}

@Injectable()
class UserDataService {
	private data: IUser[];

	constructor() {
		this.data = [
			{
				access: '06/21/2017 09:25:13',
				created: '06/21/2017 09:23:13',
				expires: '06/21/2017 09:38:13',
				remaining: '',
				status: 'online',
				user: 'PFS01',
			},
			{
				access: '06/21/2017 09:33:56',
				created: '06/21/2017 09:24:22',
				expires: '06/21/2017 09:39:22',
				remaining: '',
				status: 'online',
				user: 'PFS02',
			},
			{
				access: '06/21/2017 09:30:13',
				created: '06/21/2017 09:19:13',
				expires: '06/21/2017 09:34:13',
				remaining: '',
				status: 'online',
				user: 'PFS03',
			},
			{
				access: '06/21/2017 09:31:13',
				created: '06/21/2017 09:25:22',
				expires: '06/21/2017 09:40:22',
				remaining: '',
				status: 'online',
				user: 'ABCD1',
			},
			{
				access: '06/21/2017 09:33:23',
				created: '06/21/2017 09:23:13',
				expires: '06/21/2017 09:38:40',
				remaining: '',
				status: 'online',
				user: 'EFGH1',
			},
			{
				access: '06/21/2017 09:30:23',
				created: '06/21/2017 09:26:13',
				expires: '06/21/2017 09:41:13',
				remaining: '',
				status: 'online',
				user: 'POIU2',
			},
			{
				access: '06/21/2017 09:31:13',
				created: '06/21/2017 09:25:45',
				expires: '06/21/2017 09:40:45',
				remaining: '',
				status: 'online',
				user: 'MKLO8',
			},
			{
				access: '03/04/2017 21:35:13',
				created: '03/04/2017 21:23:13',
				expires: '03/04/2017 21:38:13',
				remaining: '',
				status: 'orphan',
				user: 'YUHJ6',
			},
			{
				access: '12/03/2017 16:18:13',
				created: '12/03/2017 16:05:13',
				expires: '12/03/2017 16:20:13',
				remaining: '',
				status: 'orphan',
				user: 'TRFG4',
			},
			{
				access: '01/05/2017 20:36:13',
				created: '01/05/2017 20:23:13',
				expires: '01/05/2017 20:38:13',
				remaining: '',
				status: 'orphan',
				user: 'QWER3',
			},
		];

		this.setTimeRemaining();
	}

	public getData(): IUser[] {
		return this.data;
	}

	private setTimeRemaining(): void {
		this.data.map((user) => {
			user.remaining = user.status === 'online'
				? this.generateFormattedTimeDifference(user.expires, user.access)
				: '-';
		});
	}

	private generateFormattedTimeDifference(expires: string, access: string): string {
		const diffInSeconds =
			moment(expires, 'MM/DD/YYYY HH:mm:ss')
				.diff(moment(access, 'MM/DD/YYYY HH:mm:ss'), 'seconds');
		const durationDifference = moment.duration(diffInSeconds, 'seconds');
		const durationInMinutes = Math.floor(durationDifference.asMinutes());
		const durationInSeconds = diffInSeconds - (durationInMinutes * 60);

		return `${durationInMinutes}:${durationInSeconds}`;
	}
}

export { IUser, UserDataService };
