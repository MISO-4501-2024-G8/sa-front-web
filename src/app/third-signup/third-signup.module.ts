import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdSignupComponent } from './third-signup.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [ThirdSignupComponent]
})
export class ThirdSignupModule { }
