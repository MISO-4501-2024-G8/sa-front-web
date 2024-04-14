import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { NavbarThirdComponent } from './navbar-third/navbar-third.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarUserComponent,
    NavbarThirdComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    NavbarUserComponent,
    NavbarThirdComponent
  ]
})
export class SharedModule { }
