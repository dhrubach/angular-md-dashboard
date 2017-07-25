import { EventEmitter, Injectable } from '@angular/core';

interface IAdminTheme {
	href: string;
	accent: string;
	primary: string;
	isDark?: boolean;
	isDefault?: boolean;
}

@Injectable()
class ThemeStorageService {

	private static storageKey = 'adm-theme-current';
	public onThemeUpdate: EventEmitter<IAdminTheme> = new EventEmitter<IAdminTheme>();

	public storeTheme(theme: IAdminTheme) {
		try {
			window.localStorage[ThemeStorageService.storageKey] = JSON.stringify(theme);
		} catch (e) { } /* tslint:disable-line */

		this.onThemeUpdate.emit(theme);
	}

	public getStoredTheme(): IAdminTheme {
		try {
			return JSON.parse(window.localStorage[ThemeStorageService.storageKey] || null);
		} catch (e) {
			return null;
		}
	}

	public clearStorage() {
		try {
			window.localStorage.removeItem(ThemeStorageService.storageKey);
		} catch (e) { }  /* tslint:disable-line */
	}
}

export { IAdminTheme, ThemeStorageService };
