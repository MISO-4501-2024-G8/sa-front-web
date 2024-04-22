import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThirdProductAddService } from './third-product-add.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../utils/session-storage.service';
import { numberValidator } from '../utils/validators.service';
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
  timeOptions: { value: string, label: string }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private toastr: ToastrService,
    private thirdProductService: ThirdProductAddService,
  ) { }

  ngOnInit() {
    this.token = this.sessionStorageService.getItem('token') ?? '';
    this.role = this.sessionStorageService.getItem('userType') ?? '';
    this.id = this.sessionStorageService.getItem('id') ?? '';
    this.productForm = this.formBuilder.group({
      typeProduct: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', Validators.required],
      representative_phone: ['', [Validators.required, numberValidator(), Validators.minLength(7), Validators.maxLength(10)]],
      address: [''], // Campo para dirección
      availability: this.formBuilder.array([]) // Campo para disponibilidad
    });

    this.availabilityForm = this.formBuilder.group({
      day: ['', [Validators.required]],
      time_start: ['', [Validators.required]],
      time_end: ['', [Validators.required]]
    });

    this.productForm.get('typeProduct')?.valueChanges.subscribe((typeProduct: string) => {
      if (typeProduct === 'medical') {
        this.productForm.get('address')?.setValidators([Validators.required]);
        this.productForm.get('availability')?.setValidators([Validators.required]);
      } else if (typeProduct === 'trainer') {
        this.productForm.get('address')?.clearValidators();
        this.productForm.get('availability')?.setValidators([Validators.required]);
      } else {
        this.productForm.get('address')?.clearValidators();
        this.productForm.get('availability')?.clearValidators();
      }
      // Actualizar los validadores
      this.productForm.get('address')?.updateValueAndValidity();
      this.productForm.get('availability')?.updateValueAndValidity();
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
    const timeS: number = parseInt(availability.time_start.toString());
    const timeE: number = parseInt(availability.time_end.toString());
    const exists = this.availabilityData.some(item => {
      return item.day === availability.day &&
        item.time_start === availability.time_start &&
        item.time_end === availability.time_end;
    });
    if (exists) {
      console.log("Error: La disponibilidad ya existe");
      this.toastr.error("La disponibilidad ya existe", "Error");
      this.resetAvailabilityForm();
      return;
    }
    if (timeS > timeE) {
      console.log("Error: time_start is greater than time_end");
      this.toastr.error("El tiempo de inicio debe ser menor o igual al tiempo de finalizacion", "Error");
      this.resetAvailabilityForm();
      return;
    }
    this.availabilityData.push(availability);
    const availabilityArray = this.productForm.get('availability') as FormArray;
    availabilityArray.push(this.createAvailabilityFormGroup(availability));
    this.resetAvailabilityForm();
  }

  deleteAvailability(index: number) {
    this.availabilityData.splice(index, 1);
    const availabilityArray = this.productForm.get('availability') as FormArray;
    availabilityArray.removeAt(index);
  }

  createAvailabilityFormGroup(availability: Availability): FormGroup {
    return this.formBuilder.group({
      day: [availability.day, Validators.required],
      time_start: [availability.time_start, Validators.required],
      time_end: [availability.time_end, Validators.required]
    });
  }

  cancelAddProduct() {
    console.log("Cancel add product");
    this.router.navigate(['/third-product']);  // Redirect to /third-product
  }

  resetAvailabilityForm() {
    this.availabilityForm.reset();
    this.availabilityForm.get('day')?.setValue('');
    this.availabilityForm.get('time_start')?.setValue('');
    this.availabilityForm.get('time_end')?.setValue('');
  }

  resetProductForm() {
    this.productForm.reset();
    this.resetAvailabilityForm();
    const availabilityArray = this.productForm.get('availability') as FormArray;
    availabilityArray.clear();
    this.availabilityData = [];
    this.productForm.get('typeProduct')?.setValue('');
  }

  generateTimeOptions(): void {
    for (let i = 6; i <= 22; i++) {
      const hour = i.toString().padStart(2, '0');
      this.timeOptions.push({ value: i.toString(), label: `${hour}:00` });
    }
  }

  addProduct(thirdProduct: ThirdProduct) {
    console.log("Add product");
    console.log(thirdProduct);
    this.thirdProductService.createThirdProduct(this.id, thirdProduct).subscribe(
      (thirdProductResponse) => {
        console.info("The product was added: ", thirdProductResponse)
        if (thirdProductResponse.code !== 201) {
          this.toastr.error(thirdProductResponse.error || "Product failed", "Error")
          return;
        }
        this.onTypeProductChange({ target: { value: '' } });
        this.resetProductForm();
        this.toastr.success("Producto agregado", "Éxito");
        this.router.navigate(['/third-product']);  // Redirect to /third-product
      },
      (error) => {
        console.error("An error occurred: ", error)
        this.toastr.error("An error occurred while trying to add the product", "Error")
      }
    );
  }

}
