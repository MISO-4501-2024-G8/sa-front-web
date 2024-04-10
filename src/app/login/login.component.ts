import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // se agrega para el formulario
import { ToastrService } from 'ngx-toastr';

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
    private loginService: LoginService
  ) { }

  loginUser(loginu: LoginUser) {
    this.loginService.loginUser(loginu).subscribe(loginResponse=>{
      console.info("The user was login: ", loginResponse)
      this.toastr.success("Confirmation", "Login successfully")
      this.loginForm.reset();
    })
  }

  cancelCreation(){
    this.loginForm.reset();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(4)]],
    });
  }

}
