import { Component, OnInit } from '@angular/core';

import { ILogo, UploadDataService } from './upload.service';

@Component({
	providers: [UploadDataService],
	selector: 'adm-upload',
	styles: [require('./upload.component.scss')],
	template: require('./upload.template.html'),
})
export class UploadComponent implements OnInit {

	private logos: ILogo[];

	constructor(private uploadService: UploadDataService) { }

	public ngOnInit(): void {
		this.fetchGridData();
	}

	private archive(logo: ILogo): void {
		logo.status = 'disable';
		setTimeout(() => {
			if (this.uploadService.markAsArchived(logo.id)) {
				this.fetchGridData();
			}
		}, 1000);
	}

	private save(data, index): void {
		data.edit = true;
		this.uploadService.saveData(data);
	}

	private fetchGridData(): void {
		this.logos = this.uploadService.getData()
			.filter((logo) => logo.status === 'active');
	}
}
