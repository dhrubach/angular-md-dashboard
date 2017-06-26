import { Component } from '@angular/core';

import { ColDef, GridOptions } from 'ag-grid/main';
import * as _ from 'lodash';

import { GridItemStatusComponent } from '../shared/grid-item-status/grid-item-status.component';
import { IUser, UserDataService } from './users.service';

@Component({
	selector: 'admin-user',
	styles: [require('./users.component.scss')],
	template: require('./users.template.html'),
})
export class UserComponent {
	private gridOptions: GridOptions;
	private rowData: IUser[];
	private columnDefs: ColDef[];
	private onlineUsers: number;

	constructor(private dataService: UserDataService) {
		this.gridOptions = {
			onGridReady: () => { },
			onGridSizeChanged: () => {
				this.gridOptions.api.sizeColumnsToFit();
			},
			pagination: true,
			paginationAutoPageSize: true,
			rowHeight: 48,
		};

		this.columnDefs = [
			{ headerName: 'User ID', field: 'user', pinned: 'left', width: 125, suppressSizeToFit: true },
			{ headerName: 'Session Created', field: 'created', width: 200 },
			{ headerName: 'Session Expires', field: 'expires', width: 200 },
			{ headerName: 'Last Access Time', field: 'access', width: 200 },
			{ headerName: 'Remaining (mm:ss)', field: 'remaining', width: 140, suppressSizeToFit: true },
			{
				cellRendererFramework: GridItemStatusComponent,
				field: 'status',
				headerName: 'Status',
				sort: 'asc',
				width: 200,
			},
		];

		this.rowData = this.dataService.getData();

		this.onlineUsers = _.filter(this.rowData, (data) => {
			return data.status === 'online';
		}).length;
	}
}
