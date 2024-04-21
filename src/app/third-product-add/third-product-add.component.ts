import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThirdProductAddService } from './third-product-add.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { ThirdProductResponse } from '../models/thirdp_response';
import { passwordValidator, emailValidator, numberValidator } from '../utils/validators.service';
import { ThirdProduct } from '../models/thirdproduct';
import { Availability } from '../models/availability';

@Component({
  selector: 'app-third-product-add',
  templateUrl: './third-product-add.component.html',
  styleUrls: ['./third-product-add.component.scss']
})
export class ThirdProductAddComponent implements OnInit {
  token: string = '';
  role: string = '';
  id: string = '';

  productForm!: FormGroup;
  availabilityForm!: FormGroup;

  showAddressFields: boolean = false;
  showAvailabilityFields: boolean = false;
  availabilityData: Availability[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productType: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      representative_phone: ['', Validators.required],
      address: [''], // Campo para dirección
      availability: this.formBuilder.array([]) // Campo para disponibilidad
    });

    this.availabilityForm = this.formBuilder.group({
      day: ['', Validators.required],
      time_start: ['', Validators.required],
      time_end: ['', Validators.required]
    });
  }

  onTypeProductChange(event: any) {
    const selectedType = event.target.value;
    if (selectedType === 'medical') {
      this.showAddressFields = true;
      this.showAvailabilityFields = true;
      // Puedes agregar lógica adicional aquí si necesitas inicializar los campos de disponibilidad de alguna manera
    } else if (selectedType === 'trainer') {
      this.showAddressFields = false;
      this.showAvailabilityFields = true;
      this.productForm.get('address')?.reset(); // Reinicia el valor de la dirección si no es un producto médico
    } else {
      this.showAddressFields = false;
      this.showAvailabilityFields = false;
      this.productForm.get('address')?.reset(); // Reinicia el valor de la dirección
      this.productForm.get('availability')?.reset(); // Reinicia los valores de los campos de disponibilidad si no es ni médico ni entrenador
    }
  }

  get availabilityFormArray() {
    return this.productForm.get('availability') as FormArray;
  }



  addAvailability(availability: Availability) {
    console.log(availability);
    const timeS = availability.time_start;
    const timeE = availability.time_end;
    console.log(timeS > timeE);
    if( availability.time_start > availability.time_end){
      console.log("Error: time_start is greater than time_end");
      this.toastr.error("El tiempo de inicio debe ser menor o igual al tiempo de finalizacion", "Error");
      return;
    }
    this.availabilityData.push(availability);
    this.productForm.get('availability')?.patchValue(this.availabilityData);
  }

  deleteAvailability(index: number) {
    this.availabilityData.splice(index, 1);
    this.productForm.get('availability')?.patchValue(this.availabilityData);
  }

  createAvailabilityGroup() {
    return this.formBuilder.group({
      day: [''],
      time_start: [''],
      time_end: ['']
    });
  }

  cancelAddProduct() {
    console.log("Cancel add product");
  }

  addProduct(thirdProduct: ThirdProduct) {
    console.log("Add product");
  }

}
