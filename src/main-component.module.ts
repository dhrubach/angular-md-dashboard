import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular/main';

import {
	AdminChartModule,
	CardComponent,
	DashboardComponent,
	SideNavComponent,
	ThemePickerComponent,
} from './app';
import { AppMaterialModule } from './main-material.module';
import { AppRoutingModule } from './main-routing.module';

const ADMIN_APP_COMPONENTS = [
	CardComponent,
	DashboardComponent,
	SideNavComponent,
	ThemePickerComponent,
];

const ADMIN_ROOT_COMPONENTS = [
	SideNavComponent,
	ThemePickerComponent,
];

@NgModule({
	declarations: [...ADMIN_APP_COMPONENTS],
	exports: [
		AppMaterialModule,
		AppRoutingModule,
		FormsModule,
		...ADMIN_ROOT_COMPONENTS,
	],
	imports: [
		AdminChartModule,
		AgGridModule,
		AppMaterialModule,
		AppRoutingModule,
		CommonModule,
		FormsModule,
	],
	providers: [],
})
export class AppComponentModule { }
