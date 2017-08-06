import { Component, OnInit } from '@angular/core';

import { SideNavListItem } from './sidenav.model';

@Component({
	selector: 'adm-sidenav',
	styles: [require('./sidenav.component.scss')],
	template: require('./sidenav.template.html'),
})
export class SideNavComponent implements OnInit {

	public listItems: SideNavListItem[];

	public ngOnInit(): void {
		this.listItems = [
			{
				iconLigatureName: 'apps',
				routerLink: 'dashboard',
				title: 'Dashboard',
			},
			{
				iconLigatureName: 'person',
				routerLink: 'user',
				title: 'Users',
			},
			{
				iconLigatureName: 'error',
				routerLink: 'exception',
				title: 'Exceptions',
			},
			{
				iconLigatureName: 'file_upload',
				routerLink: 'upload',
				title: 'Upload',
			},
		];
	}

}
