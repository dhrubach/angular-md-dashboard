import { Component, OnDestroy } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid/main';
import { SimpleTimer } from 'ng2-simple-timer';

import { IUser, UserDataService } from '../../users/users.service';

@Component({
	template: `<div>{{counterMin}}:{{counterSec}}</div>`,
})
export class GridItemRemainingTimeComponent implements ICellRendererAngularComp, OnDestroy {
	private params: ICellRendererParams;
	private counterMin: number;
	private counterSec: number;
	private timerId: string;

	constructor(private simpleTimer: SimpleTimer, public userService: UserDataService) {
		this.counterMin = 0;
		this.counterSec = 0;
	}

	public agInit(params: ICellRendererParams): void {
		this.params = params;
		if (this.params.data && this.params.data.remaining !== '-') {
			const timerStartsAt = this.params.data.remaining.split(':');
			if (timerStartsAt && timerStartsAt.length) {
				this.counterMin = Number.parseInt(timerStartsAt[0]);
				this.counterSec = Number.parseInt(timerStartsAt[1]);

				this.simpleTimer.newTimer('1sec', 1);
				this.subscribeTimer();
			}
		}
	}

	public afterGuiAttached(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}

	public ngOnDestroy(): void {
		if (this.timerId) {
			this.simpleTimer.unsubscribe(this.timerId);
		}
	}

	private subscribeTimer(): void {
		if (!(this.counterMin === 0 && this.counterSec === 0)) {
			this.timerId = this.simpleTimer.subscribe('1sec', (e) => this.timerCallback());
		}
	}

	private timerCallback() {
		if ((this.counterMin === 0 && this.counterSec > 0) || (this.counterMin > 0)) {
			this.counterSec--;
			if (this.counterSec < 0) {
				this.counterSec = 59;
				this.counterMin--;
			}
		}
	}
}
