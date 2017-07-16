import { Component, Input } from '@angular/core';

import { ChartEvent, ChartType } from 'ng-chartist';

import * as Chartist from 'chartist';

interface IBarChartData {
	header: string;
	data: Chartist.IChartistData;
	type: 'proposal' | 'accounts'
}

@Component({
	selector: 'bar-chart',
	styles: [require('./bar-chart.component.scss')],
	template: require('./bar-chart.template.html'),
})
class BarChartComponent {
	private event: ChartEvent;
	private type: ChartType;

	@Input() private header: string;
	@Input() private data: Chartist.IChartistData;
	@Input() private dataType: string;

	constructor() {
		this.type = 'Bar';
		this.event = {
			draw: (data) => {
				if (data.type === 'bar') {
					data.element.animate({
						y2: {
							begin: 50,
							dur: 700,
							from: data.y1,
							to: data.y2,
						},
					});
				}
			},
		};
	}
}

export { BarChartComponent, IBarChartData };