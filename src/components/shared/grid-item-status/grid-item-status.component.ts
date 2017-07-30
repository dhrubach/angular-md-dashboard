import { Component, Input } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid/main';

@Component({
	selector: 'grid-item-status',
	styles: [require('./grid-item-status.component.scss')],
	template: `
		<div class="grid-row__cell-status"
			 [class.grid-row__cell-status--is-online]="params?.value === 'online'"
			 [class.grid-row__cell-status--is-offline]="params?.value === 'orphan'">
		</div>
	`,
})
export class GridItemStatusComponent implements ICellRendererAngularComp {

	private params: ICellRendererParams;

	public agInit(params: ICellRendererParams): void {
		this.params = params;
	}

	public afterGuiAttached(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}
}
