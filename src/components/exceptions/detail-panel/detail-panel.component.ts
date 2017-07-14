import { Component } from '@angular/core';

import { ColDef, Grid, GridOptions, ICellRendererComp, ICellRendererParams } from 'ag-grid/main';

@Component({
	template: '',
})
export class DetailPanelComponent implements ICellRendererComp {

	private params: ICellRendererParams;
	private detailGridOptions: GridOptions;
	private detailColumnDefinitions: ColDef[];
	private eGui: HTMLElement;

	public init(params: ICellRendererParams): void {
		this.params = params;

		this.detailColumnDefinitions = [
			{ headerName: 'Timestamp', field: 'timestamp', width: 100 },
			{ headerName: 'Message', field: 'message', width: 100 },
			{ headerName: 'FileName', field: 'fileName', width: 100 },
		];

		const eDiv = document.createElement('div');
		eDiv.innerHTML = `
			<ag-grid-angular style="width: 100%; height: 100%;" class="ag-material"
				[gridOptions]="detailGridOptions" [columnDefs]="columnDefs" [rowData]="rowData">
			</ag-grid-angular>
		`;

		this.eGui = eDiv.firstElementChild as HTMLElement;
		this.setUpDetailGrid(this.params);
	}

	public getGui(): HTMLElement {
		return this.eGui;
	}

	private setUpDetailGrid(records: ICellRendererParams): void {
		this.detailGridOptions = {
			columnDefs: this.detailColumnDefinitions,
			onGridReady: (params) => {
				params.api.sizeColumnsToFit();
			},
			rowData: records.node.parent.data.childRecords,
			rowHeight: 40,
		};

		new Grid(this.eGui, this.detailGridOptions); // tslint:disable:no-unused-expression
	}
}
