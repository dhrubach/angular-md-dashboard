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
			"labels": [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday"
			],
			"series": [
				[
					12,
					9,
					7,
					8,
					5
				],
				[
					2,
					1,
					3.5,
					7,
					3
				],
				[
					1,
					3,
					4,
					5,
					6
				]
			]
		};
	}
}
