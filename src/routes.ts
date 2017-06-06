import { Route } from '@angular/router'

import { DashboardComponent } from './components';

export const routes: Route[] = [
	{ path: 'dashboard', component: DashboardComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
