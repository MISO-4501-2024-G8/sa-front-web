import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';

import { ThirdService } from './third.service';
import { ThirdUserCatalog } from '../models/thirdu_catalog';
@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {

  token: string = '';
  role: string = '';
  id: string = '';
  thirdCatalog: ThirdUserCatalog[] = [];
  imageSources: string[] = [
    '../../assets/pics/delivery-devices.jpg',
    '../../assets/pics/doctor.jpeg',
    '../../assets/pics/food-delivery.jpeg',
    '../../assets/pics/food.jpeg',
    '../../assets/pics/service.jpeg',
    '../../assets/pics/trainer.png',
    '../../assets/pics/transport.jpeg'
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private thirdService: ThirdService
  ) { }

  ngOnInit(): void {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.getThirdCatalog();
  }

  getThirdCatalog() {
    console.log("Get third catalog")
    this.thirdService.getThirdCatalog().subscribe(
      (response) => {
        console.log("Third catalog: ", response)
        this.thirdCatalog = response.thirdUsers;
        this.generateRandomImageForCatalog();
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to get the third catalog", "Error")
      }
    );
  }

  generateRandomImageForCatalog() {
    this.thirdCatalog.forEach(item => {
      item.src = this.getRandomImageSource();
    });
  }

  getRandomImageSource(): string {
    const randomIndex = Math.floor(Math.random() * this.imageSources.length);
    return this.imageSources[randomIndex];
  }

  goToSignUpThird() {
    this.router.navigate(['/third-signup']);
  }

}
