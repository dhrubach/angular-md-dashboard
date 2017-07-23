import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components';
import { AppComponentModule } from './main-component.module';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		AppComponentModule,
		BrowserAnimationsModule,
		BrowserModule,
	],
	providers: [],
})
export class MainComponent { }
