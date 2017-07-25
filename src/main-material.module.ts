import { NgModule } from '@angular/core';
import {
	MdButtonModule,
	MdCardModule,
	MdCheckboxModule,
	MdGridListModule,
	MdIconModule,
	MdListModule,
	MdMenuModule,
	MdSidenavModule,
	MdToolbarModule,
} from '@angular/material';

@NgModule({
	exports: [
		MdButtonModule,
		MdCardModule,
		MdCheckboxModule,
		MdGridListModule,
		MdIconModule,
		MdListModule,
		MdMenuModule,
		MdSidenavModule,
		MdToolbarModule,
	],
})
export class AppMaterialModule { }
