import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cus-create',
  templateUrl: './cus-create.component.html',
  styleUrls: ['./cus-create.component.css'], // Corrected property name
})
export class CusCreateComponent {
  addcustomerForm: FormGroup;
  isShippingEnabled: boolean = false;
  successToster: boolean = false;
  message: string = '';

  constructor(
    private fb1: FormBuilder,
    private cser: CustomerService,
    private router: Router,
  ) {
    this.addcustomerForm = this.fb1.group({
      comId: [],
      cusName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
      cusConPerson: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z ]+')],
      ],
      cusConPhone: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)],
      ],
      cusEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-z]+.([a-z]{2})+(?:\.(com|in|edu|net)){1}$/,
          ),
        ],
      ],
      cusGst: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z\d]{2}$/),
        ],
      ],
      cusBillAndShip: ['', [Validators.required]],
      cusBAdd1: ['', [Validators.required]],
      cusBAdd2: ['', [Validators.required]],
      cusSAdd1: ['', [Validators.required]],
      cusSAdd2: ['', [Validators.required]],
      cusBPcode: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)],
      ],
      cusSPcode: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)],
      ],
      cusBCity: ['', [Validators.required]],
      cusSCity: ['', [Validators.required]],
      cusBState: ['', [Validators.required]],
      cusSState: ['', [Validators.required]],
    });
  }

  onRadioChange(optionValue: string) {
    if (optionValue === '400') {
      this.isShippingEnabled = true;
      this.addcustomerForm.patchValue({
        cusSAdd1: '',
        cusSAdd2: '',
        cusSPcode: '',
        cusSCity: '',
        cusSState: '',
      });
    }
    if (optionValue === '200') {
      this.isShippingEnabled = true;
      this.addcustomerForm.patchValue({
        cusSAdd1: this.addcustomerForm.value.cusBAdd1,
        cusSAdd2: this.addcustomerForm.value.cusBAdd2,
        cusSPcode: this.addcustomerForm.value.cusBPcode,
        cusSCity: this.addcustomerForm.value.cusBCity,
        cusSState: this.addcustomerForm.value.cusBState,
      });
    }
  }

  submitCustomer(data: any) {
    let comId = sessionStorage.getItem('companyId');
    setTimeout(() => {
      this.successToster = false;
    }, 2000);

    this.cser.addCustomer(comId, data).subscribe((res) => {
      console.log(res);
      this.successToster = true;
      this.message = 'Register Successfully';
      this.addcustomerForm.reset(); // Reset the form after successful submission
      this.router.navigate(['/home/quote']);
    });
  }
}
