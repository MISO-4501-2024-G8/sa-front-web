import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // se agrega para el formulario
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { LoginUser } from '../models/loginu';
import { LoginService } from './login.service';
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
    private router: Router
  ) { }

  failedAttempt: number = 0;

  checkFailedAttempt() {
    this.failedAttempt++;
    localStorage.setItem('failedAttempt', this.failedAttempt.toString());
    localStorage.setItem('expiration', (Date.now() + (1 * 30 * 1000)).toString()); // 1 minute
    console.log("Failed attempt: ", this.failedAttempt);
    if (this.failedAttempt >= 3) {
      setTimeout(() => {
        this.failedAttempt = 0;
        localStorage.setItem('failedAttempt', '0');
      }, 1 * 60 * 1000); // 1 minutes
    }
  }
  loginUser(loginu: LoginUser) {

    const expiration = localStorage.getItem('expiration');
    if (expiration && Date.now() > Number(expiration)) {
      localStorage.removeItem('failedAttempt');
      localStorage.removeItem('expiration');
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
        this.toastr.success("Login successfully", "Confirmation")
        this.loginForm.reset();
        // Remove failedAttempt and expiration from localStorage and reset failedAttempt
        localStorage.removeItem('failedAttempt');
        localStorage.removeItem('expiration');
        this.failedAttempt = 0;
        // Save token in local storage and redirect to /home
        localStorage.setItem('token', loginResponse.token);
        this.router.navigate(['/home']);  // Redirect to /home
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
    this.failedAttempt = localStorage.getItem('failedAttempt') ? parseInt(localStorage.getItem('failedAttempt') || '0') : 0;
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

}
