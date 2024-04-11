import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThirdSignupComponent } from './third-signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [ThirdSignupComponent]
})
export class ThirdSignupModule { }
