import { NgModule } from '@angular/core';
import {
	MdButtonModule,
	MdCardModule,
	MdIconModule,
	MdListModule,
	MdSidenavModule,
	MdToolbarModule,
} from '@angular/material';

@NgModule({
	exports: [
		MdButtonModule,
		MdCardModule,
		MdIconModule,
		MdListModule,
		MdSidenavModule,
		MdToolbarModule,
	],
})
export class AppMaterialModule { }
