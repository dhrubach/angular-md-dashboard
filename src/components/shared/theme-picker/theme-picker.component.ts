import { Component } from '@angular/core';
import { StyleManagerService } from './../style-manager/style-manager.service';
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
			accent: '#FFC107',
			href: 'deeppurple-amber.css',
			isDark: false,
			primary: '#673AB7',
		},
		{
			accent: '#E91E63',
			href: 'indigo-pink.css',
			isDark: false,
			isDefault: true,
			primary: '#3F51B5',
		},
		{
			accent: '#607D8B',
			href: 'pink-bluegrey.css',
			isDark: true,
			primary: '#E91E63',
		},
		{
			accent: '#4CAF50',
			href: 'purple-green.css',
			isDark: true,
			primary: '#9C27B0',
		},
	];

	constructor(public styleManager: StyleManagerService, private themeStorageService: ThemeStorageService) {
		this.currentTheme = this.themeStorageService.getStoredTheme();
		if (this.currentTheme) {
			this.installTheme(this.currentTheme);
		}
	}

	private installTheme(theme: IAdminTheme): void {
		this.currentTheme = this._getCurrentThemeFromHref(theme.href);

		if (theme.isDefault) {
			this.styleManager.removeStyle('theme');
		} else {
			this.styleManager.setStyle('theme', `assets/${theme.href}`);
		}

		if (this.currentTheme) {
			this.themeStorageService.storeTheme(this.currentTheme);
		}
	}

	private _getCurrentThemeFromHref(href: string): IAdminTheme {
		return this.themes.find((theme) => theme.href === href);
	}
}
