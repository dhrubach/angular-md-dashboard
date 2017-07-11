import { Component, ViewChild } from '@angular/core';

import { ColDef, Events, GridOptions } from 'ag-grid/main';
import * as _ from 'lodash';

import { GridItemStatusComponent } from '../shared/grid-item-status/grid-item-status.component';
import {
	GridPaginationComponent,
	IPagination,
	PaginationActionType,
} from '../shared/grid-pagination/grid-pagination.component';
import { IUser, UserDataService } from './users.service';

@Component({
	providers: [UserDataService],
	selector: 'admin-user',
	styles: [require('./users.component.scss')],
	template: require('./users.template.html'),
})
export class UserComponent {
	private gridOptions: GridOptions;
	private rowData: IUser[];
	private columnDefs: ColDef[];
	private onlineUsers: number;

	@ViewChild(GridPaginationComponent)
	private paginationComponent: GridPaginationComponent;

	constructor(private dataService: UserDataService) {
		this.gridOptions = {
			onGridReady: () => {
				this.onPaginationPageLoaded();
			},
			onGridSizeChanged: () => {
				this.gridOptions.api.sizeColumnsToFit();
				this.gridOptions.api.addEventListener(
					Events.EVENT_PAGINATION_CHANGED,
					this.onPaginationPageLoaded.bind(this),
				);
			},
			pagination: true,
			paginationAutoPageSize: true,
			rowHeight: 48,
			suppressPaginationPanel: true,
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

	public onPaginationPageLoaded(): void {
		const config: IPagination = {
			currentPage: this.gridOptions.api.paginationGetCurrentPage(),
			pageSize: this.gridOptions.api.paginationGetPageSize(),
			totalPage: this.gridOptions.api.paginationGetTotalPages(),
			totalRecords: this.gridOptions.api.paginationGetRowCount(),
		};

		this.paginationComponent.setActionButtonState(config);
		this.paginationComponent.setPageLabels(config);
	}

	private refreshPageView(buttonType: PaginationActionType) {
		switch (buttonType) {
			case PaginationActionType.first:
				this.gridOptions.api.paginationGoToFirstPage();
				break;
			case PaginationActionType.previous:
				this.gridOptions.api.paginationGoToPreviousPage();
				break;
			case PaginationActionType.next:
				this.gridOptions.api.paginationGoToNextPage();
				break;
			case PaginationActionType.last:
				this.gridOptions.api.paginationGoToLastPage();
				break;
		}
	}
}
