import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-cus-view',
  templateUrl: './cus-view.component.html',
  styleUrl: './cus-view.component.css',
})
export class CusViewComponent implements OnInit {
  @Output() closeCustomer = new EventEmitter<Boolean>();
  @Input() vId: any;
  isSave: boolean = false;
  isEdit: boolean = true;
  isSaveIcon: boolean = true;
  updateCustomerForm: FormGroup;
  constructor(
    private ufb: FormBuilder,
    private cusService: CustomerService,
  ) {
    this.updateCustomerForm = this.ufb.group({
      id: [],
      comId: [],
      cusId: [],
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
      cusBState: ['', [Validators.required]],
      cusSCity: ['', [Validators.required]],
      cusSState: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    console.log(this.vId);
    this.fetchCustomerDetails();
    this.updateCustomerForm.get('cusName')?.disable();
    this.updateCustomerForm.get('cusConPerson')?.disable();
    this.updateCustomerForm.get('cusConPhone')?.disable();
    this.updateCustomerForm.get('cusEmail')?.disable();
    this.updateCustomerForm.get('cusBillAndShip')?.disable();
    this.updateCustomerForm.get('cusBAdd1')?.disable();
    this.updateCustomerForm.get('cusBAdd2')?.disable();
    this.updateCustomerForm.get('cusSAdd1')?.disable();
    this.updateCustomerForm.get('cusSAdd2')?.disable();
    this.updateCustomerForm.get('cusBPcode')?.disable();
    this.updateCustomerForm.get('cusSPcode')?.disable();
    this.updateCustomerForm.get('cusBCity')?.disable();
    this.updateCustomerForm.get('cusBState')?.disable();
    this.updateCustomerForm.get('cusSCity')?.disable();
    this.updateCustomerForm.get('cusSState')?.disable();
  }
  edit() {
    this.updateCustomerForm.get('cusName')?.enable();
    this.updateCustomerForm.get('cusConPerson')?.enable();
    this.updateCustomerForm.get('cusConPhone')?.enable();
    this.updateCustomerForm.get('cusEmail')?.enable();
    this.updateCustomerForm.get('cusBillAndShip')?.enable();
    this.updateCustomerForm.get('cusBAdd1')?.enable();
    this.updateCustomerForm.get('cusBAdd2')?.enable();
    this.updateCustomerForm.get('cusSAdd1')?.enable();
    this.updateCustomerForm.get('cusSAdd2')?.enable();
    this.updateCustomerForm.get('cusBPcode')?.enable();
    this.updateCustomerForm.get('cusSPcode')?.enable();
    this.updateCustomerForm.get('cusBCity')?.enable();
    this.updateCustomerForm.get('cusBState')?.enable();
    this.updateCustomerForm.get('cusSCity')?.enable();
    this.updateCustomerForm.get('cusSState')?.enable();
    this.isSave = true;
    this.isEdit = false;
  }
  _customerDetail: any;
  fetchCustomerDetails() {
    this.cusService.getCustomerId(this.vId).subscribe((res) => {
      console.log(res);
      this._customerDetail = res;

      this.updateCustomerForm.patchValue({
        comId: this._customerDetail.comId,
        cusId: this._customerDetail.cusId,
        cusName: this._customerDetail.cusName,
        cusConPerson: this._customerDetail.cusConPerson,
        cusConPhone: this._customerDetail.cusConPhone,
        cusEmail: this._customerDetail.cusEmail,
        cusGst: this._customerDetail.cusGst,
        cusBillAndShip: this._customerDetail.cusBillAndShip,
        cusBAdd1: this._customerDetail.cusBAdd1,
        cusBAdd2: this._customerDetail.cusBAdd2,
        cusSAdd1: this._customerDetail.cusSAdd1,
        cusSAdd2: this._customerDetail.cusSAdd2,
        cusBPcode: this._customerDetail.cusBPcode,
        cusSPcode: this._customerDetail.cusSPcode,
        cusBCity: this._customerDetail.cusBCity,
        cusSCity: this._customerDetail.cusSCity,
        cusBState: this._customerDetail.cusBState,
        cusSState: this._customerDetail.cusSState,
      });
      if (this._customerDetail.cusBillAndShip == 400) {
        this.isShippingEnabled = true;
      }
    });
  }
  isShippingEnabled: boolean = false;
  onRadioChange(optionValue: string) {
    if (optionValue === '400') {
      this.isShippingEnabled = true;
      this.updateCustomerForm.patchValue({
        cusSAdd1: '',
        cusSAdd2: '',
        cusSPcode: '',
        cusSCity: '',
        cusSState: '',
      });
    }
    if (optionValue === '200') {
      this.isShippingEnabled = true;
      this.updateCustomerForm.patchValue({
        cusSAdd1: this.updateCustomerForm.value.cusBAdd1,
        cusSAdd2: this.updateCustomerForm.value.cusBAdd2,
        cusSPcode: this.updateCustomerForm.value.cusBPcode,
        cusSCity: this.updateCustomerForm.value.cusBCity,
        cusSState: this.updateCustomerForm.value.cusBState,
      });
    }
  }

  _cusUpdate: any;
  submitUpdate(data: any) {
    let id = this._customerDetail.cusId;
    console.log(id);
    this.isSaveIcon = false;

    this.cusService.updatecustomer(id, data).subscribe((res) => {
      console.log(res);
    });
  }
}
