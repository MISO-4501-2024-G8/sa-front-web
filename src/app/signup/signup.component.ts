import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { SessionStorageService } from '../utils/session-storage.service';
import { passwordValidator, emailValidator, numberValidator } from '../utils/validators.service';
import { SignupUser } from '../models/signupu';
import { SignupService } from './signup.service';
import { fixToastPosition } from '../utils/fixcss.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private signupService: SignupService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
  }

  signupUser(signupu: SignupUser) {
    // fix toast position
    this.toastr.show("Signing up...", "Info");
    const isFixed = fixToastPosition();
    console.log('isFixed:', isFixed);
    if (!isFixed) {
      setTimeout(() => {
        console.log('1 second delay...');
      }, 1000);
    }
    // fix toast position
    console.log(signupu);
    if (signupu.acceptance_notify === false ||
      signupu.acceptance_tyc === false ||
      signupu.acceptance_personal_data === false) {
        this.toastr.clear();
        this.toastr.error("You must accept all the acceptance conditions", "Error")
        return;
    }
    this.signupService.signupUser(signupu).subscribe(
      (signupResponse) => {
        console.info("The user was signup: ", signupResponse)
        if (signupResponse.code !== 200) {
          this.toastr.clear();
          this.toastr.error(signupResponse.error || "Signup failed", "Error")
          return;
        }
        this.toastr.clear();
        this.toastr.success("Signup success", "Success")
        this.sessionStorageService.setItem('token', signupResponse.token);
        this.sessionStorageService.setItem('userType', '1');
        this.sessionStorageService.setItem('typePlan', 'basico');
        this.sessionStorageService.setItem('id', signupResponse.id);
        const userName = signupu.name + " " + signupu.surname;
        this.sessionStorageService.setItem('name', userName);
        this.sessionStorageService.setItem('userSport', signupu.sports);
        this.router.navigate(['/plan']);  // Redirect to /home
      },
      (error) => {
        console.error("Error: ", error);
        this.toastr.clear();
        this.toastr.error("Signup failed", "Error");
      }
    )
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ["", [Validators.required, emailValidator()]],
      password: ["", [Validators.required, Validators.minLength(8), passwordValidator()]],
      doc_num: ["", Validators.required], // input number
      doc_type: ["", Validators.required], // input string
      name: ["", Validators.required], // input string
      surname: ["", Validators.required], // input string
      phone: ["", [Validators.required, numberValidator(), Validators.minLength(7), Validators.maxLength(10)]], // input number
      gender: ["", Validators.required], // input string
      age: ["", Validators.required], // input number
      weight: ["", Validators.required], // input number
      height: ["", Validators.required], // input number
      birth_country: ["", Validators.required], // input string
      birth_city: ["", Validators.required], // input string
      residence_country: ["", Validators.required], // input string
      residence_city: ["", Validators.required], // input string
      residence_seniority: ["", Validators.required], // number
      sports: ["", Validators.required], // dropdown selection
      acceptance_notify: [false, Validators.required], // checkbox
      acceptance_tyc: [false, Validators.required], // checkbox
      acceptance_personal_data: [false, Validators.required], // checkbox
    });
  }

}
