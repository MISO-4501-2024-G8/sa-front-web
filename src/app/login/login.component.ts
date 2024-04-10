import { Component, OnInit} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // se agrega para el formulario
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { LoginUser } from '../models/loginu';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, NavbarComponent, RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  loginUser(loginu: LoginUser) {
    this.loginService.loginUser(loginu).subscribe(loginResponse=>{
      console.info("The user was login: ", loginResponse)
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
