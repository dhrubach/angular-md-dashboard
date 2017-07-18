import { Component, Input, OnInit } from '@angular/core';

import { ChartEvent, ChartType } from 'ng-chartist';

import * as Chartist from 'chartist';

interface IChartData {
	header: string;
	data: Chartist.IChartistData;
	type: 'proposal' | 'accounts' | 'exception';
	chartType: 'Line' | 'Bar' | 'Pie';
}

@Component({
	selector: 'adm-chart',
	styles: [require('./chart.component.scss')],
	template: require('./chart.template.html'),
})
class ChartComponent implements OnInit {

	private event: ChartEvent;
	private options: Chartist.ILineChartOptions | Chartist.IBarChartOptions | Chartist.IPieChartOptions;

	@Input() private type: ChartType;
	@Input() private header: string;
	@Input() private data: Chartist.IChartistData[];
	@Input() private dataType: string;

	public ngOnInit(): void {
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
				} else if (data.type === 'bar') {
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

		if (this.type === 'Pie') {
			this.options = {
				chartPadding: 20,
				startAngle: 270,
				donut: true,
				donutWidth: 30,
				showLabel: false,
				total: 100,
			};
		} else {
			this.options = {
				axisX: {
					offset: 15,
					showLabel: true,
				},
				axisY: {
					offset: 20,
					showLabel: true,
				},
			};
		}
	}

}

export { ChartComponent, IChartData };
