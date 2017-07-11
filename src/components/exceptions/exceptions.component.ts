import { Component, ViewChild } from '@angular/core';

import { ColDef, Events, GridOptions } from 'ag-grid/main';

import {
	GridPaginationComponent,
	IPagination,
	PaginationActionType,
} from '../shared/grid-pagination/grid-pagination.component';
import { ExceptionsDataService, IException } from './exceptions.service';

@Component({
	providers: [ExceptionsDataService],
	selector: 'admin-exceptions',
	styles: [require('./exceptions.component.scss')],
	template: require('./exceptions.template.html'),
})
export class ExceptionsComponent {
	private gridOptions: GridOptions;
	private rowData: IException[];
	private masterColumnDefs: ColDef[];
	private detailColumnDefs: ColDef[];

	@ViewChild(GridPaginationComponent)
	private paginationComponent: GridPaginationComponent;

	constructor(private dataService: ExceptionsDataService) {
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

		this.masterColumnDefs = [
			{
				cellRenderer: 'group',
				cellRendererParams: {
					suppressCount: true,
				},
				field: 'startDate',
				headerName: 'Time of Occurance',
				suppressSizeToFit: true,
				width: 200,
			},
			{ field: 'errorCode', headerName: 'Status Code', width: 200 },
			{ field: 'typeOfError', headerName: 'Type of Error', width: 250 },
		];

		this.rowData = this.dataService.getData();
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
