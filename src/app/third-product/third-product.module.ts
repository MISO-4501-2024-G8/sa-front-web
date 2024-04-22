import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdProductComponent } from './third-product.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ThirdProductComponent]
})
export class ThirdProductModule { }
