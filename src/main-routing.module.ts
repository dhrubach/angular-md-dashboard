import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { routes } from './routes';

@NgModule({
	exports: [
		RouterModule,
	],
	imports: [
		RouterModule.forRoot(routes, {
			useHash: true,
		}),
	],
})
export class AppRoutingModule { }
