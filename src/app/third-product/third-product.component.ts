import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThirdProductService } from './third-product.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { ThirdProductResponse } from '../models/thirdp_response';
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
    this.getAllThirdProductsByThirdID();

  }

  getAllThirdProductsByThirdID() {
    this.thirdProductService.getAllThirdProductsbyID(this.id).subscribe(
      (allTProducts) => {
        const thirdProducts: ThirdProductResponse[] = allTProducts.allProducts as ThirdProductResponse[];
        const noAditionalProducts: ThirdProductResponse[] = thirdProducts.filter(product => {
          return product.productType !== 'trainer' && product.productType !== 'medical';
        });
        console.log("No aditional products: ", noAditionalProducts)
        this.thirdProducts = thirdProducts;
        if(this.thirdProducts.length === 0){
          this.toastr.info("No products found", "Info")
        }
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to get the third product", "Error")
      }
    );
  }

  deleteProduct(id: string) {
    console.log("Delete product: ", id)
    this.thirdProductService.deleteThirdProduct(id).subscribe(
      (response) => {
        console.info("The product was deleted: ", response)
        if (response.code !== 200) {
          this.toastr.error(response.error || "Delete failed", "Error")
          return;
        }
        this.toastr.success("Delete success", "Success")
        this.getAllThirdProductsByThirdID();

      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to delete the product", "Error")
      }
    );
  }

  addProduct() {
    this.router.navigate(['/third-product-add']);
  }

}
