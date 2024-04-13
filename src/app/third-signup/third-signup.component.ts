import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { SessionStorageService } from '../utils/session-storage.service';
import { passwordValidator } from '../utils/password-validator.service';
import { ThirdUser } from '../models/thirdu';
import { ThirdSignupService } from './third-signup.service';
import { fixToastPosition } from '../utils/fixcss.service';

@Component({
  selector: 'app-third-signup',
  templateUrl: './third-signup.component.html',
  styleUrls: ['./third-signup.component.scss']
})
export class ThirdSignupComponent implements OnInit{

  thirdSignUpForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private thirdSignupService : ThirdSignupService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  }

  thirdUserSignUp(thirdu: ThirdUser) {
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
    console.log(thirdu);
    if(thirdu.company_creation_date){
      thirdu.company_creation_date = this.formatDate(thirdu.company_creation_date);
    }
    this.thirdSignupService.thirdSignUpUser(thirdu).subscribe(
      (thirdResponse) => {
        console.info("The third user was signup: ", thirdResponse)
        if (thirdResponse.code !== 200) {
          this.toastr.clear();
          this.toastr.error(thirdResponse.error || "Third Signup failed", "Error")
          return;
        }
        this.toastr.clear();
        this.toastr.success("Third Signup success", "Success")
        this.sessionStorageService.setItem('token', thirdResponse.token);
        this.router.navigate(['/third']);  // Redirect to /home
      },
      (error) => {
        this.toastr.clear();
        this.toastr.error("Third Signup failed", "Error")
        console.error("Error:", error)
      }
    );
  }

  ngOnInit() {
    this.thirdSignUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), passwordValidator()]],
      doc_num: ['', [Validators.required]],
      doc_type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      company_creation_date: ['', [Validators.required]],
      company_address: ['', [Validators.required]],
      contact_name: ['', [Validators.required]]
    });
  }

}
