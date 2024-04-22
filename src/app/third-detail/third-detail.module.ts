import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdDetailComponent } from './third-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ThirdDetailComponent]
})
export class ThirdDetailModule { }
