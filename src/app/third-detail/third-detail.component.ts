import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { numberValidator } from '../utils/validators.service';
import { ThirdUserCatalog } from '../models/thirdu_catalog';
import { ThirdDetailService } from './third-detail.service';
import { ThirdProductResponse } from '../models/thirdp_response';
import { ThirdProduct } from '../models/thirdproduct';
import { CustomerService } from '../models/customerservice';
import { forkJoin } from 'rxjs';


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
  productServices: ThirdProduct[] = [];
  custserviceForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private thirdDetailService: ThirdDetailService
  ) { }

  ngOnInit() {
    const thirdId = this.sessionStorageService.getItem('thirdId') ?? '';
    if (thirdId === '') {
      this.router.navigate(['/third']);
    }
    this.id = thirdId;
    const thirdIt = this.sessionStorageService.getItem('thirdItem') ?? '';
    if (thirdIt === '') {
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
    this.custserviceForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      user_address: ['', Validators.required],
      user_neighborhood: ['', Validators.required],
      user_phone: ['', [Validators.required, numberValidator(), Validators.minLength(7), Validators.maxLength(10)]], // input number
      service_date: [this.getCurrentDate(), Validators.required],
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  }

  updateTotalService(isChecked: boolean, value: number, third_product: ThirdProduct) {
    if (isChecked) {
      this.totalService += value;
      this.productServices.push(third_product);

    } else {
      this.totalService -= value;
      this.productServices = this.productServices.filter(product => {
        return product.id !== third_product.id;
      });
    }
  }

  createCustomerService(cservice: CustomerService) {
    console.log("Create customer service")
    const userType = this.sessionStorageService.getItem('userType') ?? '';
    const idUser = this.sessionStorageService.getItem('id') ?? '';
    if (userType === 1) {
      cservice.id_user = idUser;
    } else {
      const newuuid = uuidv4().split('-')[0];
      cservice.id_user = 'nsa_'+newuuid;
    }
    cservice.user_name = cservice.name + ' ' + cservice.surname;
    //console.log("Customer service: ", cservice)
    //console.log("Product services: ", this.productServices)

    const observables = this.productServices.map(product => {
      const id = product.id;
      const cservice_copy = { ...cservice };
      cservice_copy.id_service = id;
      cservice_copy.value = product.value;
      return this.thirdDetailService.createCustomerService(cservice_copy);
    });

    forkJoin(observables).subscribe(
      (responses) => {
        // Manejar la respuesta
        console.log("Responses: ", responses);
        // Por ejemplo, verificar si alguna petición falló
        const anyError = responses.some(response => response.code !== 201);
        if (anyError) {
          this.toastr.error("Error en la creacion de Servicios", "Error");
        }
        else {
          this.toastr.success("Customer service created successfully", "Success");
          //this.router.navigate(['/third-home']);
        }
      },
      (error) => {
        // Manejar errores
        console.error("An error occurred: ", error);
        this.toastr.error("An error occurred while trying to create the customer service", "Error");
      }
    );
    // for (let product of this.productServices) {
    //   const id = product.id;
    //   const cservice_copy = {...cservice};
    //   cservice_copy.id_service = id;
    //   cservice_copy.value = product.value;
    //   console.log("Customer service copy: ", cservice_copy)
    //   this.thirdDetailService.createCustomerService(cservice_copy).subscribe(
    //     (response) => {
    //       console.log("Customer service response: ", response)
    //       if (response.code !== 200) {
    //         this.toastr.error(response.error || "Create failed", "Error");
    //       }
    //     },
    //     (error) => {
    //       console.error("An error occurred: ", error)
    //       this.toastr.error("An error occurred while trying to create the customer service", "Error")
    //     }
    //   );
    // }
  }

}
