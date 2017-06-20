import { Component } from '@angular/core';

import { ChartType } from 'ng-chartist';

import * as Chartist from 'chartist';

@Component({
	selector: 'adm-chart',
	styles: [require('./chart.component.scss')],
	template: require('./chart.template.html'),
})
export class ChartComponent {
	private type: ChartType;
	private data: Chartist.IChartistData;

	constructor() {
		this.type = 'Line';
		this.data = {
			labels: [ 'M', 'T', 'W', 'T', 'F', 'S', 'S'],
			series: [
				[ 10, 50, 40, 55, 100, 30, 10],
			],
		};
	}
}
