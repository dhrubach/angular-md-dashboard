import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartistModule } from 'ng-chartist';

import {
	AppComponent,
	ChartComponent,
	DashboardComponent,
	ExceptionsComponent,
	SettingsComponent,
	SideNavComponent,
	UserComponent,
} from './components';
import { AppMaterialModule } from './main-material.module';
import { AppRoutingModule } from './main-routing.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		ChartComponent,
		DashboardComponent,
		ExceptionsComponent,
		SettingsComponent,
		SideNavComponent,
		UserComponent,
	],
	imports: [
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
