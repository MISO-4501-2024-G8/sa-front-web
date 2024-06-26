import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RoleGuard } from './utils/role-guard.service';

import { StartpComponent } from './startp/startp.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EventComponent } from './event/event.component';
import { PlanComponent } from './plan/plan.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { SessionComponent } from './session/session.component';
import { SignupComponent } from './signup/signup.component';
import { ThirdComponent } from './third/third.component';
import { ThirdSignupComponent } from './third-signup/third-signup.component';
import { ThirdHomeComponent } from './third-home/third-home.component';
import { ThirdProductComponent } from './third-product/third-product.component';
import { ThirdProductAddComponent } from './third-product-add/third-product-add.component';
import { ThirdDetailComponent } from './third-detail/third-detail.component';
import { SportSessionComponent } from './sport-session/sport-session.component';
import { MySessionComponent } from './my-session/my-session.component';
import { StravaComponent } from './strava/strava.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  { path: '', component: StartpComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event', component: EventComponent },
  { path: 'event-detail', component: EventDetailComponent },
  { path: 'third', component: ThirdComponent },
  { path: 'third-detail', component: ThirdDetailComponent },
  { path: 'third-signup', component: ThirdSignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'plan', component: PlanComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'profile', component: ProfileComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'session', component: SessionComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'sport-session', component: SportSessionComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'my-session', component: MySessionComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'payment', component: PaymentComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'strava', component: StravaComponent, canActivate: [RoleGuard], data: { expectedRole: '1' }},
  { path: 'third-home', component: ThirdHomeComponent, canActivate: [RoleGuard], data: { expectedRole: '2' }},
  { path: 'third-product', component: ThirdProductComponent, canActivate: [RoleGuard], data: { expectedRole: '2' }},
  { path: 'third-product-add', component: ThirdProductAddComponent, canActivate: [RoleGuard], data: { expectedRole: '2' }},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
