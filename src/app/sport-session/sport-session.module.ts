import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportSessionComponent } from './sport-session.component';
import { SharedModule } from '../shared/shared.module';
import { IgxCalendarModule } from 'igniteui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IgxCalendarModule,
    BrowserAnimationsModule,
    HammerModule,
  ],
  declarations: [SportSessionComponent]
})
export class SportSessionModule { }
