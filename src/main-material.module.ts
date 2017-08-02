import { NgModule } from '@angular/core';
import {
	MdButtonModule,
	MdCardModule,
	MdCheckboxModule,
	MdGridListModule,
	MdIconModule,
	MdInputModule,
	MdListModule,
	MdMenuModule,
	MdSidenavModule,
	MdToolbarModule,
	MdTooltipModule,
} from '@angular/material';

@NgModule({
	exports: [
		MdButtonModule,
		MdCardModule,
		MdCheckboxModule,
		MdGridListModule,
		MdIconModule,
		MdInputModule,
		MdListModule,
		MdMenuModule,
		MdSidenavModule,
		MdToolbarModule,
		MdTooltipModule,
	],
})
export class AppMaterialModule { }
