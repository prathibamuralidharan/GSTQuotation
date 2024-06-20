import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-b-view',
  templateUrl: './b-view.component.html',
  styleUrl: './b-view.component.css',
})
export class BViewComponent implements OnInit {
  @Output() closeBank = new EventEmitter<boolean>();
  @Input() ViewBankId: any;
  isSave: boolean = false;
  isEdit: boolean = true;
  isSaveIcon: boolean = true;
  isConfrimacc: boolean = false;
  updateBankForm: FormGroup;
  constructor(
    private bser: CompanyService,
    private fb: FormBuilder,
  ) {
    this.updateBankForm = this.fb.group({
      comId: [sessionStorage.getItem('companyId')],
      bankName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
      accountNo: [
        '',
        [
          Validators.required,
          Validators.pattern(/^-?\d*\.?\d+$/),
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      conAccountNo: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      branchName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
      ifscCode: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{4}0[0-9]{6}$/)],
      ],
    });
  }
  ngOnInit() {
    this.fetchBankDetails();
    console.log(this.ViewBankId);
  }
  _BankDetail: any;
  fetchBankDetails() {
    this.bser.getBankbyId(this.ViewBankId).subscribe((res) => {
      console.log(res);

      this._BankDetail = res;
      this.updateBankForm.patchValue({
        bankName: this._BankDetail.bankName,
        accountNo: this._BankDetail.accountNo,
        branchName: this._BankDetail.branchName,
        ifscCode: this._BankDetail.ifscCode,
      });
    });
    this.updateBankForm.get('bankName')?.disable();
    this.updateBankForm.get('accountNo')?.disable();
    this.updateBankForm.get('branchName')?.disable();
    this.updateBankForm.get('ifscCode')?.disable();
  }
  enableEdit() {
    this.updateBankForm.get('bankName')?.enable();
    this.updateBankForm.get('accountNo')?.enable();
    this.updateBankForm.get('conAccountNo')?.enable();
    this.updateBankForm.get('branchName')?.enable();
    this.updateBankForm.get('ifscCode')?.enable();
    this.isSave = true;
    this.isConfrimacc = true;
    this.isEdit = false;
  }

  submitUpdate(data: any) {
    let id = this._BankDetail.bankId;
    this.bser.updateBank(id, data).subscribe((res) => {
      console.log(res);
    });
  }
}
