import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular/main';
import { ChartistModule } from 'ng-chartist';

import {
	AppComponent,
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
	UserComponent,
} from './components';
import { AppMaterialModule } from './main-material.module';
import { AppRoutingModule } from './main-routing.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
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
		UserComponent,
	],
	entryComponents: [BarChartComponent, LineChartComponent, PieChartComponent],
	imports: [
		AgGridModule.withComponents([
			DetailPanelComponent,
			GridItemStatusComponent,
			StatusFilterComponent,
		]),
		AppMaterialModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		ChartistModule,
		FormsModule,
	],
	providers: [],
})
export class MainComponent { }
