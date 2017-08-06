import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular/main';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { AppMaterialModule } from '../../../main-material.module';

import { DateTimeFilterComponent } from './date-time-filter.component';

@NgModule({
	declarations: [DateTimeFilterComponent],
	exports: [DateTimeFilterComponent],
	imports: [
		AgGridModule.withComponents([
			DateTimeFilterComponent,
		]),
		AppMaterialModule,
		CommonModule,
		DateTimePickerModule,
		FormsModule,
	],
})
export class DateTimeFilterModule { }
