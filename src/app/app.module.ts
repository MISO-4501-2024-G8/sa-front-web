import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { StartpModule } from './startp/startp.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { EventModule } from './event/event.module';
import { PlanModule } from './plan/plan.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './profile/profile.module';
import { SessionModule } from './session/session.module';
import { SignupModule } from './signup/signup.module';
import { ThirdModule } from './third/third.module';
import { ThirdSignupModule } from './third-signup/third-signup.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StartpModule,
    SignupModule,
    LoginModule,
    EventModule,
    PlanModule,
    HomeModule,
    PaymentModule,
    ProfileModule,
    SessionModule,
    ThirdModule,
    ThirdSignupModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }