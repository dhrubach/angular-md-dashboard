import { Component } from '@angular/core';

import { IFilterAngularComp } from 'ag-grid-angular/main';
import { IFilterParams } from 'ag-grid/main';
import * as moment from 'moment/moment';

@Component({
	styles: [require('./date-time-filter.component.scss')],
	template: require('./date-time-filter.template.html'),
})
export class DateTimeFilterComponent implements IFilterAngularComp {

	private filterActive: boolean;
	private params: IFilterParams;
	private momentValueFrom: any;
	private momentValueTo: any;
	private elementId: string;

	public agInit(params: IFilterParams): void {
		this.params = params;
		this.filterActive = false;
		this.momentValueFrom = moment('01/01/2015 00:00:00');
		this.momentValueTo = moment('12/31/2017 12:59:59');
	}

	public isFilterActive(): boolean {
		return this.filterActive;
	}

	public doesFilterPass(params): boolean {
		const dateCreated = moment(params.data.created);
		return dateCreated.isBetween(this.momentValueFrom, this.momentValueTo);
	}

	/* tslint:disable:no-empty */

	public getModel(): void { }

	public setModel(): void { }

	/* tslint:enable:no-empty */

	private inputIdentifier(id): void {
		this.elementId = id;
	}

	private setMoment(selectedValue: any): void {
		if (this.elementId === 'fromVal') {
			this.momentValueFrom = selectedValue;
		} else {
			this.momentValueTo = selectedValue;
		}
		if (this.momentValueFrom || this.momentValueTo) {
			this.filterActive = true;
		}
		this.params.filterChangedCallback();
	}

	private resetFilter(): void {
		this.filterActive = false;
		this.momentValueFrom = moment('01/01/2015 00:00:00');
		this.momentValueTo = moment('12/31/2017 12:59:59');
		this.params.filterChangedCallback();
	}
}
