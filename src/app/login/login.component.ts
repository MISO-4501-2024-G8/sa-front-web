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

  loginUser(loginu: LoginUser) {
    this.loginService.loginUser(loginu).subscribe(
      loginResponse => {
        console.info("The user was login: ", loginResponse)
        if (loginResponse.code == 200) {
          this.toastr.success("Login successfully", "Confirmation")
          this.loginForm.reset();
          localStorage.setItem('token', loginResponse.token);
          this.router.navigate(['/home']);  // Redirect to /home
        } else {
          this.toastr.error(loginResponse.error || "Login failed", "Error")
        }
      },
      error => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred", "Error")
      }
    )
  }

  cancelCreation() {
    this.loginForm.reset();
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

}
