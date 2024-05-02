import { NgModule } from '@angular/core';

import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { IgxCalendarModule } from 'igniteui-angular';

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
import { ThirdHomeModule } from './third-home/third-home.module';
import { ThirdProductModule } from './third-product/third-product.module';
import { ThirdProductAddModule } from './third-product-add/third-product-add.module';
import { ThirdDetailModule } from './third-detail/third-detail.module';
import { SportSessionModule } from './sport-session/sport-session.module';
import { MySessionModule } from './my-session/my-session.module';
import { StravaModule } from './strava/strava.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    IgxCalendarModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
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
    ThirdHomeModule,
    ThirdProductModule,
    ThirdProductAddModule,
    ThirdDetailModule,
    SportSessionModule,
    MySessionModule,
    StravaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
