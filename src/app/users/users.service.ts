import { Injectable } from '@angular/core';

import * as moment from 'moment';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';

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

	private static dateFormat: string = 'MM/DD/YYYY HH:mm:ss';
	private data: IUser[];
	private updateUserData$: Observable<number>;

	constructor() {
		this.data = [
			{
				access: '06/21/2017 09:38:01',
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
			{
				access: '04/22/2017 20:36:13',
				created: '04/22/2017 20:23:13',
				expires: '04/22/2017 20:38:13',
				remaining: '',
				status: 'orphan',
				user: 'GHJK7',
			},
			{
				access: '01/12/2017 20:36:13',
				created: '01/12/2017 20:23:13',
				expires: '01/12/2017 20:38:13',
				remaining: '',
				status: 'orphan',
				user: 'RTYH5',
			},
			{
				access: '06/21/2017 09:31:51',
				created: '06/21/2017 09:30:23',
				expires: '06/21/2017 09:45:23',
				remaining: '',
				status: 'online',
				user: 'AZXS1',
			},
			{
				access: '02/03/2017 20:36:13',
				created: '02/03/2017 20:23:13',
				expires: '02/03/2017 20:38:13',
				remaining: '',
				status: 'orphan',
				user: 'IUYT5',
			},
			{
				access: '06/21/2017 09:33:30',
				created: '06/21/2017 09:31:23',
				expires: '06/21/2017 09:46:23',
				remaining: '',
				status: 'online',
				user: 'POLP5',
			},
		];

		this.updateUserData$ = Observable.interval(1000);

		this.setTimeRemaining();
	}

	public getData(): IUser[] {
		return this.data;
	}

	public refreshData(username: string): {
		remaining: string;
		status: string;
	} {
		const userObject = this.data.find((uobj) => uobj.user === username);
		return userObject ? { remaining: userObject.remaining, status: userObject.status } : null;
	}

	private setTimeRemaining(): void {
		this.data.map((user) => {
			user.remaining = user.status === 'online'
				? this.generateFormattedTimeDifference(user.expires, user.access)
				: '-';
		});

		this.updateUserData$.subscribe(() => this.updateTimeRemaining());
	}

	private updateTimeRemaining(): void {
		this.data.map((user) => {
			if (user.status === 'online') {
				const newRemainingTime = moment(user.remaining, 'mm:ss').subtract(1, 'seconds').format('mm:ss');
				user.remaining = newRemainingTime === '00:00' ? '-' : newRemainingTime;
				if (user.remaining === '-') {
					user.status = 'orphan';
				}
			}
		});
	}

	private generateFormattedTimeDifference(expires: string, access: string): string {
		const diffInSeconds =
			moment(expires, 'MM/DD/YYYY HH:mm:ss')
				.diff(moment(access, 'MM/DD/YYYY HH:mm:ss'), 'seconds');
		if (diffInSeconds > 0) {
			const durationDifference = moment.duration(diffInSeconds, 'seconds');
			const durationInMinutes = Math.floor(durationDifference.asMinutes());
			const durationInSeconds = diffInSeconds - (durationInMinutes * 60);

			return `${durationInMinutes}:${durationInSeconds}`;
		}

		return '-';
	}

}

export { IUser, UserDataService };
