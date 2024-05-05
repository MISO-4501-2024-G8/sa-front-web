import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StravaComponent } from './strava.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [StravaComponent]
})
export class StravaModule { }
