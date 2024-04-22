import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // se agrega para el formulario
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionStorageService } from '../utils/session-storage.service';
import { LoginUser } from '../models/loginu';
import { LoginService } from './login.service';
import { emailValidator } from '../utils/validators.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NavbarComponent]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  failedAttempt: number = 0;

  checkFailedAttempt() {
    this.failedAttempt++;
    this.sessionStorageService.setItem('failedAttempt', this.failedAttempt.toString());
    this.sessionStorageService.setItem('expiration', (Date.now() + (1 * 30 * 1000)).toString()); // 1 minute
    console.log("Failed attempt: ", this.failedAttempt);
    if (this.failedAttempt >= 3) {
      setTimeout(() => {
        this.failedAttempt = 0;
        this.sessionStorageService.setItem('failedAttempt', '0');
      }, 1 * 60 * 1000); // 1 minutes
    }
  }
  loginUser(loginu: LoginUser) {

    const expiration = this.sessionStorageService.getItem('expiration');
    if (expiration && Date.now() > Number(expiration)) {
      this.sessionStorageService.removeItem('failedAttempt');
      this.sessionStorageService.removeItem('expiration');
      this.failedAttempt = 0;
    }

    if (this.failedAttempt >= 3) {
      this.toastr.error("You have reached the maximum number of failed attempts, try in 1 min", "Error")
      return;
    }
    this.loginService.loginUser(loginu).subscribe(
      (loginResponse) => {
        console.info("The user was login: ", loginResponse)
        if (loginResponse.code !== 200) {
          this.toastr.error(loginResponse.error || "Login failed", "Error")
          this.checkFailedAttempt();
          return;
        }
        this.loginService.validateToken(loginResponse.token).subscribe(
          (validateResponse) => {
            console.info("The token was validated: ", validateResponse)
            if (validateResponse.code !== 200) {
              this.toastr.error(validateResponse.message || "Token validation failed", "Error")
              return;
            }
            this.loginService.getUserInfo(loginResponse.token, loginResponse.id).subscribe(
              (userInfo) => {
                // userInfo -> Contains the user information
                const name = userInfo.name ?? 'Usuario';
                this.sessionStorageService.setItem('name', name);
                this.toastr.success("Login successfully", "Confirmation")
                this.loginForm.reset();
                // Remove failedAttempt and expiration from this.sessionStorageService and reset failedAttempt
                this.sessionStorageService.removeItem('failedAttempt');
                this.sessionStorageService.removeItem('expiration');
                this.failedAttempt = 0;
                // Save token in local storage

                if (validateResponse.userType === 1) {
                  this.sessionStorageService.setItem('token', loginResponse.token);
                  this.sessionStorageService.setItem('userType', '1');
                  this.sessionStorageService.setItem('typePlan', validateResponse.typePlan);
                  this.sessionStorageService.setItem('id', loginResponse.id);
                  this.router.navigate(['/home']);  // Redirect to /home
                } else if (validateResponse.userType === 2) {
                  this.sessionStorageService.setItem('token', loginResponse.token);
                  this.sessionStorageService.setItem('userType', '2');
                  this.sessionStorageService.setItem('id', loginResponse.id);
                  this.router.navigate(['/third-home']);  // Redirect to /third-home
                } else if (validateResponse.userType === 3) {
                  this.toastr.show("Your admin dashboard is in construction", "Info");
                  this.router.navigate(['/']);
                }
                else {
                  this.router.navigate(['/']);  // Redirect to /
                }
              },
              (error) => {
                console.error("An error occurred: ", error)
              }
            );
          },
          (error) => {
            console.error("An error occurred: ", error)
            this.toastr.error("An error occurred", "Error")
          }
        )
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred", "Error")
        this.checkFailedAttempt();
      }
    )
  }

  cancelCreation() {
    this.loginForm.reset();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.failedAttempt = this.sessionStorageService.getItem('failedAttempt') ? parseInt(this.sessionStorageService.getItem('failedAttempt') ?? '0') : 0;
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, emailValidator()]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

}
