import { Component, OnInit, ViewChild } from '@angular/core';
import { ColDef, Events, GridOptions } from 'ag-grid/main';

import { filter, forEach, reverse, sortBy } from 'lodash-es';

import { IChartData } from './../components';
import { DetailPanelComponent } from './detail-panel/detail-panel.component';
import { DetailPanelService, IDetail } from './detail-panel/detail-panel.service';
import { ExceptionsDataService, IException } from './exceptions.service';

@Component({
	selector: 'adm-exceptions',
	styles: [require('./exceptions.component.scss')],
	template: require('./exceptions.template.html'),
})
export class ExceptionsComponent implements OnInit {

	private gridOptions: GridOptions;
	private rowData: IException[];
	private masterColumnDefs: ColDef[];
	private detailColumnDefs: ColDef[];
	private barChart: IChartData;
	private pieChart: IChartData;

	constructor(
		private exceptionDataService: ExceptionsDataService,
		private detailsPanelService: DetailPanelService,
	) { }

	public ngOnInit(): void {
		this.prepareExceptionGrid();
		this.prepareExceptionBarChart();
		this.prepareExceptionPieChart();
	}

	private prepareExceptionGrid(): void {
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
	}

	private prepareExceptionBarChart(): void {
		this.barChart = {
			chartType: 'Bar',
			data:
			{
				labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
				series: [
					[74, 50, 40, 55, 100, 30, 10],
				],
			},
			header: 'Last 7 days',
			type: 'exception',
		};
	}

	private prepareExceptionPieChart(): void {
		this.pieChart = {
			chartType: 'Pie',
			data: {
				labels: ['500', '401', '400', '404'],
				series: [
					{
						meta: '500',
						value: 25,
					},
					{
						meta: '401',
						value: 15,
					},
					{
						meta: '400',
						value: 10,
					},
					{
						meta: '404',
						value: 7,
					},
				],
			},
			header: 'Top 4 Exception Status Codes',
			type: 'default',
		};
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
