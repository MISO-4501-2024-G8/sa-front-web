import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdHomeComponent } from './third-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ThirdHomeComponent]
})
export class ThirdHomeModule { }
