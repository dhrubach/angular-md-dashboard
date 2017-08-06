import { Routes } from '@angular/router';

import { ExceptionsComponent } from './exceptions.component';

// tslint:disable:object-literal-sort-keys
export const routes: Routes = [
	{
		path: '', children: [
			{ path: '', component: ExceptionsComponent },
		],
	},
];
