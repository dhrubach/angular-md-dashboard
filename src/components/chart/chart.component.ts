import { Component, Input } from '@angular/core';

import { ChartEvent, ChartType } from 'ng-chartist';

import * as Chartist from 'chartist';

interface IChartData {
	header: string;
	data: Chartist.IChartistData;
	type: 'proposal' | 'accounts';
}

@Component({
	selector: 'adm-chart',
	styles: [require('./chart.component.scss')],
	template: require('./chart.template.html'),
})
class ChartComponent {
	private type: ChartType;
	private event: ChartEvent;

	@Input() private header: string;
	@Input() private data: Chartist.IChartistData[];
	@Input() private dataType: string;

	constructor() {
		this.type = 'Line';
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

export { ChartComponent, IChartData };
