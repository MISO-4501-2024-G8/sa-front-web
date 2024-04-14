import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
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

const routes: Routes = [
  { path: '', component: StartpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event', component: EventComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'session', component: SessionComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'third', component: ThirdComponent },
  { path: 'third-signup', component: ThirdSignupComponent },
  { path: 'third-home', component: ThirdHomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
