import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, Events, GridOptions } from 'ag-grid/main';

import { filter, forEach } from 'lodash-es';

import { DetailPanelComponent } from './detail-panel/detail-panel.component';
import { DetailPanelService, IDetail } from './detail-panel/detail-panel.service';
import { ExceptionsDataService, IException } from './exceptions.service';

@Component({
	providers: [ExceptionsDataService, DetailPanelService],
	selector: 'admin-exceptions',
	styles: [require('./exceptions.component.scss')],
	template: require('./exceptions.template.html'),
})
export class ExceptionsComponent implements OnInit {

	private gridOptions: GridOptions;
	private rowData: IException[];
	private masterColumnDefs: ColDef[];
	private detailColumnDefs: ColDef[];

	constructor(
		private exceptionDataService: ExceptionsDataService,
		private detailsPanelService: DetailPanelService,
	) { }

	public ngOnInit(): void {
		this.gridOptions = {
			fullWidthCellRenderer: DetailPanelComponent,
			getNodeChildDetails: (record: IException) => {
				if (record && record.childRecords && record.childRecords.length) {
					return {
						children: [record.childRecords],
						group: true,
						key: record.errorCode,
					};
				} else {
					return null;
				}
			},
			getRowHeight: (params) => {
				const rowIsDetailRow = params.node.level === 1;
				return rowIsDetailRow ? 200 : 40;
			},
			isFullWidthCell: (rowNode) => {
				return rowNode.level === 1;
			},
			onGridReady: (params) => {
				params.api.sizeColumnsToFit();
			},
			pagination: false,
		};

		this.masterColumnDefs = [
			{
				cellRenderer: 'group',
				field: 'errorCode',
				headerName: 'Status Code',
				width: 150,
			},
			{ headerName: 'Type of Error', field: 'typeOfError', width: 150 },
		];

		this.rowData = this.prepareGridData();
	}

	private prepareGridData(): IException[] {
		const exceptionDataServiceData = this.exceptionDataService.getData();
		const detailsPanelServiceData = this.detailsPanelService.getData();

		forEach(exceptionDataServiceData, (exception) => {
			const detailsDataByErrorCode =
				filter(detailsPanelServiceData, (detail) => {
					return detail.errorCode === exception.errorCode;
				});
			exception.childRecords = detailsDataByErrorCode;
		});

		return exceptionDataServiceData;
	}
}
