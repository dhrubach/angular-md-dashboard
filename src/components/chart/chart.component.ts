import { Component } from '@angular/core';

import { ChartEvent, ChartType } from 'ng-chartist';

import * as Chartist from 'chartist';

@Component({
	selector: 'adm-chart',
	styles: [require('./chart.component.scss')],
	template: require('./chart.template.html'),
})
export class ChartComponent {
	private type: ChartType;
	private data: Chartist.IChartistData[];
	private event: ChartEvent;

	constructor() {
		this.type = 'Line';
		this.data = [
			{
				labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
				series: [
					[10, 50, 40, 55, 100, 30, 10],
				],
			},
			{
				labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
				series: [
					[50, 90, 40, 55, 100, 30, 40],
				],
			},
		];
		this.event = {
			draw: (data) => {
				if (data.type === 'line' || data.type === 'area') {
					data.element.animate({
						d: {
							begin: 600,
							dur: 700,
							easing: Chartist.Svg.Easing.easeOutQuint,
							from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
							to: data.path.clone().stringify(),
						},
					});
				}
			},
		};
	}
}
