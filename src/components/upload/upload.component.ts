import { Component, OnInit } from '@angular/core';

import { ILogo, UploadDataService } from './upload.service';

@Component({
	providers: [UploadDataService],
	selector: 'adm-upload',
	styles: [require('./upload.component.scss')],
	template: require('./upload.template.html'),
})
export class UploadComponent implements OnInit {

	private uploadedFile: File;
	private logos: ILogo[];
	private showPreviewBlock: boolean;
	private url: string;

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

	private fetchGridData(): void {
		this.logos = this.uploadService.getData()
			.filter((logo) => logo.status === 'active');
	}

	private save(data, index): void {
		data.edit = true;
		this.uploadService.saveData(data);
	}

	private showImagePreview(event: Event): void {
		const uploadedFiles = (event.target as any).files as FileList;
		if (uploadedFiles && uploadedFiles.length) {
			this.uploadedFile = uploadedFiles[0];

			if (this.uploadedFile && this.uploadedFile.size) {
				const reader = new FileReader();
				reader.onload = (evt: Event) => {
					this.url = (evt.target as any).result;
					this.showPreviewBlock = true;
				};
				reader.readAsDataURL(this.uploadedFile);
			}
		}
	}

}
