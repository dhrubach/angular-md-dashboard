import { Injectable } from '@angular/core';

interface ILogo {
	edit: boolean;
	id: number;
	logoName: string;
	url: string;
	status: string;
}

@Injectable()
class UploadDataService {

	private imagesData: ILogo[];

	constructor() {
		this.imagesData = [
			{
				edit: false,
				id: 1,
				logoName: 'Primerica',
				status: 'enable',
				url: require('../../assets/logo/logo-1.jpg'),
			},
			{
				edit: false,
				id: 2,
				logoName: 'Meeder',
				status: 'enable',
				url: require('../../assets/logo/logo-2.jpg'),
			},
			{
				edit: false,
				id: 3,
				logoName: 'Horizon Investments',
				status: 'disable',
				url: require('../../assets/logo/logo-4.png'),
			},
			{
				edit: false,
				id: 4,
				logoName: 'LockWood Advisors',
				status: 'enable',
				url: require('../../assets/logo/logo-5.jpg'),
			},
			{
				edit: false,
				id: 5,
				logoName: 'Morning Star',
				status: 'enable',
				url: require('../../assets/logo/logo-6.jpg'),
			},
			{
				edit: false,
				id: 6,
				logoName: 'Invesco',
				status: 'disable',
				url: require('../../assets/logo/logo-7.png'),
			},
			{
				edit: false,
				id: 7,
				logoName: 'Sage',
				status: 'enable',
				url: require('../../assets/logo/logo-8.jpg'),
			},
		];
	}

	public getData(): ILogo[] {
		return this.imagesData;
	}

	public saveData(newData) {
		this.imagesData = newData;
	}
}

export { ILogo, UploadDataService } ;
