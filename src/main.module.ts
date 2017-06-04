import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	MdButtonModule,
	MdSidenavModule,
	MdToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardAppComponent } from './components';

@NgModule({
	bootstrap: [DashboardAppComponent],
	declarations: [DashboardAppComponent],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		MdButtonModule,
		MdSidenavModule,
		MdToolbarModule,
	],
	providers: [],
})
export class MainComponent { }
