/* tslint:disable:ordered-imports */

import 'core-js/client/shim';
import 'hammerjs';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

/* tslint:enable:ordered-imports */

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainComponent } from './main.module';

import './main.style.scss';

import './assets/custom-themes/amber-cyan.scss';
import './assets/custom-themes/indigo-orange.scss';
import './assets/custom-themes/red-brown.scss';
import './assets/custom-themes/teal-deep-orange.scss';

platformBrowserDynamic().bootstrapModule(MainComponent);
