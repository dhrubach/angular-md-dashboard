import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular/main';
import { ChartistModule } from 'ng-chartist';

import {
	AppComponent,
	CardComponent,
	ChartComponent,
	DashboardComponent,
	ExceptionsComponent,
	GridItemStatusComponent,
	SettingsComponent,
	SideNavComponent,
	UserComponent,
	UserDataService,
} from './components';
import { AppMaterialModule } from './main-material.module';
import { AppRoutingModule } from './main-routing.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		CardComponent,
		ChartComponent,
		DashboardComponent,
		ExceptionsComponent,
		GridItemStatusComponent,
		SettingsComponent,
		SideNavComponent,
		UserComponent,
	],
	imports: [
		AgGridModule.withComponents([
			GridItemStatusComponent,
		]),
		AppMaterialModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		ChartistModule,
		FormsModule,
	],
	providers: [UserDataService],
})
export class MainComponent { }
