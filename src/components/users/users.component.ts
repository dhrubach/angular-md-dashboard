import { Component } from '@angular/core';

import { GridOptions } from 'ag-grid/main';
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
	private columnDefs: any[];
	private onlineUsers: number;

	constructor(private dataService: UserDataService) {
		this.gridOptions = {
			onGridReady: () => {
				this.gridOptions.api.sizeColumnsToFit();
			},
			rowHeight: 48,
		};

		this.columnDefs = [
			{ headerName: 'User ID', field: 'user', pinned: 'left', maxWidth: '125'},
			{ headerName: 'Session Created', field: 'created' },
			{ headerName: 'Session Expires', field: 'expires' },
			{ headerName: 'Last Access Time', field: 'access'},
			{ headerName: 'Time Remaining (mm:ss)', field: 'remaining'},
			{
				cellRendererFramework: GridItemStatusComponent,
				field: 'status',
				headerName: 'Status',
				sort: 'asc',
			},
		];

		this.rowData = this.dataService.getData();

		this.onlineUsers = _.filter(this.rowData, (data) => {
			return data.status === 'online';
		}).length;
	}
}
