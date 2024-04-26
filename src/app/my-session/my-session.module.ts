import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MySessionComponent } from './my-session.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [MySessionComponent]
})
export class MySessionModule { }
