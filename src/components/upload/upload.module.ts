import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppMaterialModule } from '../../main-material.module';

import { UploadComponent } from './upload.component';

import { routes } from './upload.routes';

@NgModule({
	declarations: [
		UploadComponent,
	],
	imports: [
		AppMaterialModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
	],
})
export class UploadModule { }
