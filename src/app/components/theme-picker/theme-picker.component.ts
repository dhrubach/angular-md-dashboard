import { Component } from '@angular/core';
import { StyleManagerService } from './style-manager/style-manager.service';
import { IAdminTheme, ThemeStorageService } from './theme-storage/theme-storage.service';

@Component({
	providers: [StyleManagerService, ThemeStorageService],
	selector: 'adm-theme-picker',
	styles: [require('./theme-picker.component.scss')],
	template: require('./theme-picker.template.html'),
})
export class ThemePickerComponent {

	private currentTheme: IAdminTheme;

	private themes: IAdminTheme[] = [
		{
			accent: '#00bcd4',
			href: 'amber-cyan.css',
			isDark: false,
			isDefault: true,
			primary: '#ffc107',
		},
		{
			accent: '#ff5722',
			href: 'teal-deep-orange.css',
			isDark: false,
			primary: '#009688',
		},
		{
			accent: '#795548',
			href: 'red-brown.css',
			isDark: true,
			primary: '#f44336',
		},
		{
			accent: '#ff9800',
			href: 'indigo-orange.css',
			isDark: true,
			primary: '#3f51b5',
		},
	];

	constructor(public styleManager: StyleManagerService, private themeStorageService: ThemeStorageService) {
		this.currentTheme = this.themeStorageService.getStoredTheme();
		if (this.currentTheme) {
			this.installTheme(this.currentTheme);
		} else {
			this.currentTheme = this.themes.find((theme) => theme.isDefault);
		}
	}

	private installTheme(theme: IAdminTheme): void {
		this.currentTheme = this._getCurrentThemeFromHref(theme.href);

		if (theme.isDefault) {
			this.styleManager.removeStyle('theme');
		} else {
			this.styleManager.setStyle('theme', `${theme.href}`);
		}

		if (this.currentTheme) {
			this.themeStorageService.storeTheme(this.currentTheme);
		}
	}

	private _getCurrentThemeFromHref(href: string): IAdminTheme {
		return this.themes.find((theme) => theme.href === href);
	}
}
