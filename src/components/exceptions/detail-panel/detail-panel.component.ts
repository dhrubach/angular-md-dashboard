import { Component, ElementRef } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular/main';
import {
	ColDef,
	GridOptions,
	IAfterGuiAttachedParams,
	ICellRendererParams,
} from 'ag-grid/main';

@Component({
	styles: [require('./detail-panel.component.scss')],
	template: require('./detail-panel.template.html'),
})
export class DetailPanelComponent implements ICellRendererAngularComp {

	private params: ICellRendererParams;
	private detailGridOptions: GridOptions;
	private detailColumnDefinitions: ColDef[];

	constructor(private elementRef: ElementRef) { }

	public refresh?(params: any): void {
		throw new Error('Method not implemented.');
	}

	public agInit(params: ICellRendererParams): void {
		this.params = params;

		this.detailColumnDefinitions = [
			{ headerName: 'Timestamp', field: 'timestamp', width: 90 },
			{ headerName: 'Message', field: 'message', width: 90 },
			{ headerName: 'FileName', field: 'fileName', width: 90 },
		];

		this.setUpDetailGrid(this.params);
		this.consumeMouseWheelOnDetailGrid();
	}

	public afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		throw new Error('Method not implemented.');
	}

	private setUpDetailGrid(records: ICellRendererParams): void {
		this.detailGridOptions = {
			columnDefs: this.detailColumnDefinitions,
			onGridReady: (params) => {
				params.api.sizeColumnsToFit();
			},
			rowData: records.node.parent.data.childRecords,
			rowHeight: 30,
		};
	}

	private consumeMouseWheelOnDetailGrid(): void {
		const detailPanelContainer =
			this.elementRef.nativeElement.querySelector('.detail-panel-container') as HTMLElement;

		const mouseWheelListener = ($event) => {
			event.stopPropagation();
		}

		detailPanelContainer.addEventListener('mousewheel', mouseWheelListener);
		detailPanelContainer.addEventListener('DOMMouseScroll', mouseWheelListener);
	}

}
