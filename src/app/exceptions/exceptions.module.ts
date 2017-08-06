import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular/main';
import { AppMaterialModule } from '../../main-material.module';
import { AdminChartModule } from '../components';

import { routes } from './exceptions.routes';

import { DetailPanelComponent } from './detail-panel/detail-panel.component';
import { DetailPanelService } from './detail-panel/detail-panel.service';
import { ExceptionsComponent } from './exceptions.component';
import { ExceptionsDataService } from './exceptions.service';

@NgModule({
	declarations: [
		DetailPanelComponent,
		ExceptionsComponent,
	],
	imports: [
		AdminChartModule,
		AgGridModule.withComponents([
			DetailPanelComponent,
		]),
		AppMaterialModule,
		RouterModule.forChild(routes),
	],
	providers: [DetailPanelService, ExceptionsDataService],
})
export class ExceptionsModule { }
