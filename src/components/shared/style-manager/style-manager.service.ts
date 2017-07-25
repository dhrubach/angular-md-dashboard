/**
 * ref angular/material.angular.io/master/src/app/shared/style-manager/style-manager.ts
 */
import { Injectable } from '@angular/core';

/**
 * Class for managing stylesheets. Stylesheets are loaded into named slots so that they can be
 * removed or changed later.
 */
@Injectable()
export class StyleManagerService {
	/**
	 * Set the stylesheet with the specified key.
	 */
	public setStyle(key: string, href: string): void {
		getLinkElementForKey(key).setAttribute('href', href);
	}

	/**
	 * Remove the stylesheet with the specified key.
	 */
	public removeStyle(key: string): void {
		const existingLinkElement = getExistingLinkElementByKey(key);
		if (existingLinkElement) {
			document.head.removeChild(existingLinkElement);
		}
	}
}

function getLinkElementForKey(key: string): HTMLLinkElement {
	return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string): HTMLLinkElement {
	return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`) as HTMLLinkElement;
}

function createLinkElementWithKey(key: string): HTMLLinkElement {
	const linkEl = document.createElement('link');
	linkEl.setAttribute('rel', 'stylesheet');
	linkEl.classList.add(getClassNameForKey(key));
	document.head.appendChild(linkEl);
	return linkEl;
}

function getClassNameForKey(key: string): string {
	return `style-manager-${key}`;
}
