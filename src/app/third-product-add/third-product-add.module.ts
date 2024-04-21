import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdProductAddComponent } from './third-product-add.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ThirdProductAddComponent]
})
export class ThirdProductAddModule { }
