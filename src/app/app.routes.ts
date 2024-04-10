import { Routes } from '@angular/router';
import { StartpComponent } from './startp/startp.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ThirdComponent } from './third/third.component';
import { ThirdSignupComponent } from './third-signup/third-signup.component';
import { EventComponent } from './event/event.component';
import { PlanComponent } from './plan/plan.component';
import { ProfileComponent } from './profile/profile.component';
import { SessionComponent } from './session/session.component';
import { PaymentComponent } from './payment/payment.component';
export const routes: Routes = [
  { path: '',title:"SportApp", component: StartpComponent },
  { path: 'login',title:"SportApp - Login", component: LoginComponent },
  { path: 'home',title:"SportApp - Home", component: HomeComponent },
  { path: 'signup',title:"SportApp - Signup", component: SignupComponent},
  { path: 'third',title:"SportApp - Third", component: ThirdComponent},
  { path: 'third-signup',title:"SportApp - Third Signup", component: ThirdSignupComponent},
  { path: 'event',title:"SportApp - Event", component: EventComponent},
  { path: 'plan',title:"SportApp - Plan", component: PlanComponent},
  { path: 'profile',title:"SportApp - Profile", component: ProfileComponent},
  { path: 'session',title:"SportApp - Session", component: SessionComponent},
  { path: 'payment',title:"SportApp - Payment", component: PaymentComponent}
];
