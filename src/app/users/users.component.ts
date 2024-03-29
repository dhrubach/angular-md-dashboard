import { Component, OnDestroy, ViewChild } from '@angular/core';

import { ColDef, Events, GridOptions, RowNode } from 'ag-grid/main';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
	DateTimeFilterComponent,
	GridItemStatusComponent,
	GridPaginationComponent,
	IPagination,
	PaginationActionType,
	StatusFilterComponent,
} from '../components';
import { IUser, UserDataService } from './users.service';

@Component({
	selector: 'adm-user',
	styles: [require('./users.component.scss')],
	template: require('./users.template.html'),
})
export class UserComponent implements OnDestroy {

	private gridOptions: GridOptions;
	private rowData: IUser[];
	private columnDefs: ColDef[];
	private onlineUsers: number;
	private refreshUserData$: Observable<number>;
	private refreshUserDataSubscription: Subscription;

	@ViewChild(GridPaginationComponent)
	private paginationComponent: GridPaginationComponent;

	constructor(private dataService: UserDataService) {
		this.gridOptions = {
			enableFilter: true,
			enableSorting: true,
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
			{ headerName: 'Session Created', field: 'created', filterFramework: DateTimeFilterComponent, width: 200 },
			{ headerName: 'Session Expires', field: 'expires', filterFramework: DateTimeFilterComponent, width: 200 },
			{ headerName: 'Last Access Time', field: 'access', filterFramework: DateTimeFilterComponent, width: 200 },
			{ headerName: 'Remaining (mm:ss)', field: 'remaining', width: 140, suppressSizeToFit: true },
			{
				cellRendererFramework: GridItemStatusComponent,
				field: 'status',
				filterFramework: StatusFilterComponent,
				headerName: 'Status',
				sort: 'asc',
				width: 200,
			},
		];

		this.rowData = this.dataService.getData();

		this.getOnlineUsers(this.rowData);

		this.refreshUserData$ = Observable.interval(3000);

		this.setUpRemainingTimeUpdateTimer();
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

	public ngOnDestroy(): void {
		if (this.refreshUserDataSubscription) {
			this.refreshUserDataSubscription.unsubscribe();
		}
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

	private setUpRemainingTimeUpdateTimer(): void {
		this.refreshUserData$.subscribe(() => {
			if (this.gridOptions && this.gridOptions.api) {
				this.gridOptions.api.forEachNodeAfterFilter((node: RowNode) => {
					const currentStatus = node.data['status'];
					if (currentStatus === 'online') {
						const { remaining, status } = this.dataService.refreshData(node.data['user']);
						node.data['remaining'] = remaining;
						node.data['status'] = status;
					}
				});
				this.gridOptions.api.refreshCells(this.gridOptions.api.getRenderedNodes(), ['remaining', 'status']);
				this.getOnlineUsers(this.dataService.getData());
			}
		});
	}

	private getOnlineUsers(users: IUser[] = []): void {
		if (users.length) {
			this.onlineUsers = users.filter((data) => {
				return data.status === 'online';
			}).length;
		} else {
			this.onlineUsers = 0;
		}
	}
}
