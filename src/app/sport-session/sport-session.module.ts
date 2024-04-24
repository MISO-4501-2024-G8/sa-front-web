import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportSessionComponent } from './sport-session.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [SportSessionComponent]
})
export class SportSessionModule { }
