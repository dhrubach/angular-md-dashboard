import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgGridModule } from 'ag-grid-angular/main';
import { AppMaterialModule } from '../../main-material.module';
import { DateTimeFilterModule } from '../components';

import { routes } from './users.routes';

import { GridItemStatusComponent, GridPaginationComponent, StatusFilterComponent } from '../components';
import { UserComponent } from './users.component';
import { UserDataService } from './users.service';

const AG_ENTRY_COMPONENTS = [
	GridItemStatusComponent,
	StatusFilterComponent,
];

@NgModule({
	declarations: [
		GridItemStatusComponent,
		GridPaginationComponent,
		StatusFilterComponent,
		UserComponent,
	],
	imports: [
		AgGridModule.withComponents([
			...AG_ENTRY_COMPONENTS,
		]),
		AppMaterialModule,
		DateTimeFilterModule,
		RouterModule.forChild(routes),
	],
	providers: [UserDataService],
})
export class UsersModule { }
