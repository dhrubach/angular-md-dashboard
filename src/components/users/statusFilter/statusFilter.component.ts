import { Component } from '@angular/core';
import { MdCheckboxChange } from '@angular/material';

import { IFilterAngularComp } from 'ag-grid-angular/main';
import { IFilterParams } from 'ag-grid/main';

@Component({
	styles: [require('./statusFilter.component.scss')],
	template: require('./statusFilter.template.html'),
})
export class StatusFilterComponent implements IFilterAngularComp {

	private checkEventClick;
	private filterActive: boolean;
	private params: IFilterParams;

	constructor() {
		this.checkEventClick = {
			'offline-filter': false,
			'online-filter': false,
		};
	}

	public agInit(params: IFilterParams): void {
		this.params = params;
		this.filterActive = false;
	}

	public isFilterActive(): boolean {
		return this.filterActive;
	}

	public doesFilterPass(params): boolean {
		return (params.data.status === 'online' && this.checkEventClick['online-filter']) ||
			(params.data.status === 'orphan' && this.checkEventClick['offline-filter']);
	}

	/* tslint:disable:no-empty */

	public getModel(): void { }

	public setModel(): void { }

	/* tslint:enable:no-empty */

	private setVisibleRows(event: MdCheckboxChange) {
		this.checkEventClick[event.source.id] = event.checked;
		this.filterActive = this.checkEventClick['online-filter'] || this.checkEventClick['offline-filter'];
		this.params.filterChangedCallback();
	}
}
