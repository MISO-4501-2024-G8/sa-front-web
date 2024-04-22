import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdDetailComponent } from './third-detail.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [ThirdDetailComponent]
})
export class ThirdDetailModule { }
