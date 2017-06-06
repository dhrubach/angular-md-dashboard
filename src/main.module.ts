import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	MdButtonModule,
	MdIconModule,
	MdListModule,
	MdSidenavModule,
	MdToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	AppComponent,
	DashboardComponent,
	ExceptionsComponent,
	SettingsComponent,
	SideNavComponent,
	UserComponent,
} from './components';
import { AppRoutingModule } from './main-routing.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
		DashboardComponent,
		ExceptionsComponent,
		SettingsComponent,
		SideNavComponent,
		UserComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		MdButtonModule,
		MdIconModule,
		MdListModule,
		MdSidenavModule,
		MdToolbarModule,
	],
	providers: [],
})
export class MainComponent { }
