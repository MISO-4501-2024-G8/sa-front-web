import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';

import { ThirdUserCatalog } from '../models/thirdu_catalog';
import { ThirdDetailService } from './third-detail.service';
import { ThirdProductResponse } from '../models/thirdp_response';

@Component({
  selector: 'app-third-detail',
  templateUrl: './third-detail.component.html',
  styleUrls: ['./third-detail.component.scss']
})
export class ThirdDetailComponent implements OnInit {

  id: string = '';
  thirdItem!: ThirdUserCatalog;
  thirdProducts: ThirdProductResponse[] = [];
  totalService: number = 0;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private thirdDetailService: ThirdDetailService
  ) { }

  ngOnInit() {
    const thirdId = this.sessionStorageService.getItem('thirdId') ?? '';
    if(thirdId === ''){
      this.router.navigate(['/third']);
    }
    this.id = thirdId;
    const thirdIt = this.sessionStorageService.getItem('thirdItem') ?? '';
    if(thirdIt === ''){
      this.router.navigate(['/third']);
    }
    this.thirdItem = JSON.parse(thirdIt);
    console.log("Third item: ", this.id, this.thirdItem)
    this.thirdDetailService.getThirdServices(this.id).subscribe(
      (response) => {
        console.log("Third services: ", response)
        const thirdProducts = response.allProducts;
        const noAditionalProducts = thirdProducts.filter(product => {
          return product.productType !== 'trainer' && product.productType !== 'medical';
        });
        console.log("No aditional products: ", noAditionalProducts)
        this.thirdProducts = noAditionalProducts;
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to get the third services", "Error")
      }
    );
  }

  updateTotalService(isChecked: boolean, value: number) {
    if (isChecked) {
      this.totalService += value;
    } else {
      this.totalService -= value;
    }
  }

}
