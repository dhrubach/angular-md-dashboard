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
import { Route, RouterModule } from '@angular/router';

import {
	DashboardAppComponent,
	SideNavComponent,
} from './components';

const routes: Route[] = [
	{ path: '', component: DashboardAppComponent},
];

@NgModule({
	bootstrap: [DashboardAppComponent],
	declarations: [
		DashboardAppComponent,
		SideNavComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		MdButtonModule,
		MdIconModule,
		MdListModule,
		MdSidenavModule,
		MdToolbarModule,
		RouterModule.forRoot(routes, {
			useHash: true,
		}),
	],
	providers: [],
})
export class MainComponent { }
