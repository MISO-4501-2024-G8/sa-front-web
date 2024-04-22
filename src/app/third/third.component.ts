import { Component, OnInit } from '@angular/core';
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

  isSportUser: boolean = false;

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
    this.sessionStorageService.removeItem('thirdId');
    if(this.token !== '' && this.role === '1' ){
      this.isSportUser = true;
    }
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

  goToThirdDetails(id: string) {
    console.log("Go to third details: ", id)
    const itemThird = this.thirdCatalog.find(item => item.id === id);
    this.sessionStorageService.setItem('thirdId', id);
    this.sessionStorageService.setItem('thirdItem', JSON.stringify(itemThird));
    this.router.navigate([`/third-detail`]);
  }

}
