import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-cus-create',
  templateUrl: './cus-create.component.html',
  styleUrl: './cus-create.component.css',
})
export class CusCreateComponent {
  addcustomerForm: FormGroup;
  isShippingEnabled: boolean = false;
  successToster: boolean = false;

  message: string = '';

  constructor(
    private fb1: FormBuilder,
    private cser: CustomerService,
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
      cusSAdd1: [],
      cusSAdd2: [],
      cusBPcode: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)],
      ],
      cusSPcode: [],
      cusBCity: ['', [Validators.required]],
      cusSCity: [],
      cusBState: ['', [Validators.required]],
      cusSState: [],
    });
  }
  onRadioChange(optionValue: string) {
    if (optionValue == '400') {
      this.isShippingEnabled = true;
    }
    if (optionValue == '200') {
      this.isShippingEnabled = false;
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
      this.addcustomerForm.reset();
    });
  }
}
