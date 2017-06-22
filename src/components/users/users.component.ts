import { Component } from '@angular/core';

import { GridOptions } from 'ag-grid/main';

@Component({
	selector: 'admin-user',
	styles: [require('./users.component.scss')],
	template: require('./users.template.html'),
})
export class UserComponent {
	private gridOptions: GridOptions;
	private rowData: any[];
	private columnDefs: any[];

	constructor() {
		this.gridOptions = {
			onGridReady: () => {
				this.gridOptions.api.sizeColumnsToFit();
			},
			rowHeight: 48,
		};
		this.columnDefs = [
			{ headerName: 'Dashboard', field: 'make' },
			{ headerName: 'Model', field: 'model' },
			{ headerName: 'Price', field: 'price' },
		];
		this.rowData = [
			{ make: 'Toyota', model: 'Celica', price: 35000 },
			{ make: 'Ford', model: 'Mondeo', price: 32000 },
			{ make: 'Porsche', model: 'Boxter', price: 72000 },
			{ make: 'Toyota', model: 'Celica', price: 35000 },
			{ make: 'Ford', model: 'Mondeo', price: 32000 },
			{ make: 'Porsche', model: 'Boxter', price: 72000 },
			{ make: 'Toyota', model: 'Celica', price: 35000 },
			{ make: 'Ford', model: 'Mondeo', price: 32000 },
			{ make: 'Porsche', model: 'Boxter', price: 72000 },
			{ make: 'Porsche', model: 'Boxter', price: 72000 },
		];
	}
}
