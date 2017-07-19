import { Component, Input, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import './plugins/chartist-bar-labels';

interface IChartData {
	header: string;
	data: Chartist.IChartistData;
	type: 'proposal' | 'accounts' | 'exception' | 'default';
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
				switch (data.type) {
					case 'line':
						this.animateLineChart(data);
						break;
					case 'bar':
						this.animateBarChart(data);
						break;
					case 'pie':
						this.animatePieChart(data);
						break;
				}
			},
		};

		if (this.type === 'Pie') {
			this.preparePieChartOptions();
		} else {
			this.prepareLineOrBarChartOptions();
		}
	}

	private animateLineChart(data: any): void {
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

	private animateBarChart(data: any): void {
		data.element.animate({
			y2: {
				begin: 50,
				dur: 700,
				from: data.y1,
				to: data.y2,
			},
		});
	}

	private animatePieChart(data: any): void {
	}

	private prepareLineOrBarChartOptions(): void {
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

		if (this.type === 'Bar') {
			this.options.plugins = [
				Chartist.plugins.ctBarLabels(),
			];
		}
	}

	private preparePieChartOptions(): void {
		this.options = {
			chartPadding: 20,
			donut: true,
			donutWidth: 30,
			showLabel: false,
		};
	}

}

export { ChartComponent, IChartData };
