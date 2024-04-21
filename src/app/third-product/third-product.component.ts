import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThirdProductService } from './third-product.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { ThirdProductResponse } from '../models/thirdp_response';
import { passwordValidator, emailValidator, numberValidator } from '../utils/validators.service';
import { ThirdProduct } from '../models/thirdproduct';
import { Availability } from '../models/availability';


@Component({
  selector: 'app-third-product',
  templateUrl: './third-product.component.html',
  styleUrls: ['./third-product.component.scss']
})
export class ThirdProductComponent implements OnInit {

  token: string = '';
  role: string = '';
  id: string = '';
  productForm!: FormGroup;
  showAddressFields: boolean = false;
  showAvailabilityFields: boolean = false;
  availabilityData: Availability[] = [];
  thirdProducts: ThirdProductResponse[] = [];
  constructor(

    private router: Router,
    private thirdProductService: ThirdProductService,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.thirdProductService.getAllThirdProductsbyID(this.id).subscribe(
      (thirdProducts) => {
        console.log("Third Products: ", thirdProducts)
        const noAditionalProducts = thirdProducts.filter(product => {
          return product.productType !== 'trainer' && product.productType !== 'medical';
        });
        console.log("No aditional products: ", noAditionalProducts)
        this.thirdProducts = thirdProducts;
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to get the third product", "Error")
      }
    );
  }

  deleteProduct(id: string) {
    console.log("Delete product: ", id)
  }

  addProduct() {
    this.router.navigate(['/third-product-add']);
  }

}
