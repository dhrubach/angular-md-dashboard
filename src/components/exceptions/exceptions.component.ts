import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, Events, GridOptions } from 'ag-grid/main';

import { filter, forEach, reverse, sortBy } from 'lodash-es';

import { IChartData } from './../chart/chart.component';
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
	private chart: IChartData;
	private donut: IChartData;

	constructor(
		private exceptionDataService: ExceptionsDataService,
		private detailsPanelService: DetailPanelService,
	) { }

	public ngOnInit(): void {
		this.gridOptions = {
			animateRows: true,
			fullWidthCellRendererFramework: DetailPanelComponent,
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
				cellRendererParams: {
					suppressCount: false,
				},
				field: 'errorCode',
				headerName: 'Status Code',
				width: 150,
			},
			{ headerName: 'Type of Error', field: 'typeOfError', width: 150 },
		];

		this.rowData = this.prepareGridData();

		this.chart = {
			chartType: 'Bar',
			data:
			{
				labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
				series: [
					[10, 50, 40, 55, 100, 30, 10],
				],
			},
			header: 'Last 7 days',
			type: 'exception',
		};

		this.donut = {
			chartType: 'Pie',
			data: {
				series: [10, 5, 25, 10],
			},
			header: 'Top 4 Types',
			type: 'exception',
		}
	}

	private prepareGridData(): IException[] {
		const exceptionDataServiceData = this.exceptionDataService.getData();
		const detailsPanelServiceData = this.detailsPanelService.getData();

		forEach(exceptionDataServiceData, (exception) => {
			const detailsDataByErrorCode =
				filter(detailsPanelServiceData, (detail) => {
					return detail.errorCode === exception.errorCode;
				});
			exception.childRecords = detailsDataByErrorCode || [];
		});

		return reverse(sortBy(exceptionDataServiceData, (exception) => {
			return exception && exception.childRecords.length || 0;
		}));
	}
}
