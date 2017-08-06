import { Routes } from '@angular/router';

import { UserComponent } from './users.component';

// tslint:disable:object-literal-sort-keys
export const routes: Routes = [
	{
		path: '', children: [
			{ path: '', component: UserComponent },
		],
	},
];
