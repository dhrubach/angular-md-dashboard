import 'core-js/client/shim';
import 'hammerjs';
import 'rxjs';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MainComponent } from './main.module';

import './main.style.scss';

platformBrowserDynamic().bootstrapModule(MainComponent);
