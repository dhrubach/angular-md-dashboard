import {
	AfterViewInit,
	Component,
	ComponentFactory,
	ComponentFactoryResolver,
	Input,
	ViewChild,
} from '@angular/core';

import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

import { BarChartComponent } from './bar-chart.component';
import { BaseChartComponent, IChartData } from './base-chart.component';
import { HostChartDirective } from './host-chart.directive';
import { LineChartComponent } from './line-chart.component';
import { PieChartComponent } from './pie-chart.component';

@Component({
	selector: 'adm-chart',
	template: `<ng-template adm-host-chart></ng-template>`,
})
class ChartComponent implements AfterViewInit {

	@Input() private config: IChartData;
	@ViewChild(HostChartDirective) private hostChart: HostChartDirective;

	constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

	public ngAfterViewInit(): void {
		let componentFactory: ComponentFactory<BaseChartComponent> = null;

		switch (this.config.chartType) {
			case 'Bar':
				componentFactory = this.componentFactoryResolver.resolveComponentFactory(BarChartComponent);
				break;
			case 'Line':
				componentFactory = this.componentFactoryResolver.resolveComponentFactory(LineChartComponent);
				break;
			case 'Pie':
				componentFactory = this.componentFactoryResolver.resolveComponentFactory(PieChartComponent);
				break;
		}

		const viewContainerRef = this.hostChart.viewContainerRef;
		viewContainerRef.clear();

		const componentRef = viewContainerRef.createComponent(componentFactory);
		(componentRef.instance as BaseChartComponent).config = this.config;
	}

}

export { ChartComponent, IChartData };
