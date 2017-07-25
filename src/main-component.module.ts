import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgGridModule } from 'ag-grid-angular/main';
import { ChartistModule } from 'ng-chartist';

import {
	BarChartComponent,
	CardComponent,
	ChartComponent,
	DashboardComponent,
	DetailPanelComponent,
	ExceptionsComponent,
	GridItemStatusComponent,
	GridPaginationComponent,
	HostChartDirective,
	LineChartComponent,
	PieChartComponent,
	SettingsComponent,
	SideNavComponent,
	StatusFilterComponent,
	ThemePickerComponent,
	UserComponent,

} from './components';
import { AppMaterialModule } from './main-material.module';
import { AppRoutingModule } from './main-routing.module';

const ADMIN_APP_COMPONENTS = [
	BarChartComponent,
	CardComponent,
	ChartComponent,
	DashboardComponent,
	DetailPanelComponent,
	ExceptionsComponent,
	GridItemStatusComponent,
	GridPaginationComponent,
	HostChartDirective,
	LineChartComponent,
	PieChartComponent,
	SettingsComponent,
	SideNavComponent,
	StatusFilterComponent,
	ThemePickerComponent,
	UserComponent,
];

const ADMIN_ENTRY_COMPONENTS = [
	BarChartComponent,
	LineChartComponent,
	PieChartComponent,
];

const AG_ENTRY_COMPONENTS = [
	DetailPanelComponent,
	GridItemStatusComponent,
	StatusFilterComponent,
];

const ADMIN_ROOT_COMPONENTS = [
	SideNavComponent,
	ThemePickerComponent,
];

@NgModule({
	declarations: [...ADMIN_APP_COMPONENTS],
	entryComponents: [...ADMIN_ENTRY_COMPONENTS],
	exports: [
		AppMaterialModule,
		AppRoutingModule,
		...ADMIN_ROOT_COMPONENTS,
	],
	imports: [
		AgGridModule.withComponents([
			...AG_ENTRY_COMPONENTS,
		]),
		AppMaterialModule,
		AppRoutingModule,
		ChartistModule,
		CommonModule,
	],
	providers: [],
})
export class AppComponentModule { }
