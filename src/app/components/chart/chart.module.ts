import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChartistModule } from 'ng-chartist';
import { AppMaterialModule } from '../../../main-material.module';

import { BarChartComponent } from './bar-chart.component';
import { IChartData } from './base-chart.component';
import { ChartComponent } from './chart.component';
import { HostChartDirective } from './host-chart.directive';
import { LineChartComponent } from './line-chart.component';
import { PieChartComponent } from './pie-chart.component';

@NgModule({
	declarations: [
		BarChartComponent,
		ChartComponent,
		HostChartDirective,
		LineChartComponent,
		PieChartComponent,
	],
	entryComponents: [
		BarChartComponent,
		LineChartComponent,
		PieChartComponent,
	],
	exports: [
		BarChartComponent,
		ChartComponent,
		HostChartDirective,
		LineChartComponent,
		PieChartComponent,
	],
	imports: [
		AppMaterialModule,
		ChartistModule,
		CommonModule,
	],
})
class AdminChartModule { }

export { AdminChartModule, IChartData };
