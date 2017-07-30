import { Component } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid/main';
import { SimpleTimer } from 'ng2-simple-timer';

import { IUser, UserDataService } from '../../users/users.service';

@Component({
	template: `<div>{{counterMin}}:{{counterSec}}</div>`,
})
export class GridItemRemainingTimeComponent implements ICellRendererAngularComp {
	private params: ICellRendererParams;
	private counterMin: number;
	private counterSec: number;
	private timerId;

	constructor(private simpleTimer: SimpleTimer, public userService: UserDataService) { }

	public agInit(params: ICellRendererParams): void {
		this.params = params;
		if (this.params.data.remaining !== '-') {
			const timerStartsAt = this.params.data.remaining.split(':');
			this.counterMin = Number.parseInt(timerStartsAt[0]);
			this.counterSec = Number.parseInt(timerStartsAt[1]);

			this.simpleTimer.newTimer('1sec', 1);
			this.subscribeTimer();
		} else {
			this.counterMin = 0;
			this.counterSec = 0;
		}
	}

	public afterGuiAttached(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}

	private subscribeTimer(): void {
		if (this.timerId) {
			this.simpleTimer.unsubscribe(this.timerId);
			this.timerId = undefined;
		} else {
			if (!(this.counterMin === 0 && this.counterSec === 0)) {
				this.timerId = this.simpleTimer.subscribe('1sec', (e) => this.timerCallback());
			}
		}
	}

	private timerCallback() {
		this.userService.remainingTimeCallback(this.params.data);
		if ((this.counterMin === 0 && this.counterSec > 0) || (this.counterMin > 0)) {
			this.counterSec--;
			if (this.counterSec < 0) {
				this.counterSec = 59;
				this.counterMin--;
			}
		}
	}
}
