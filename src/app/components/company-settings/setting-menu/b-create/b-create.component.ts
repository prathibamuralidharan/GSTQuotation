import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-b-create',
  templateUrl: './b-create.component.html',
  styleUrl: './b-create.component.css',
})
export class BCreateComponent {
  message: string = '';
  successToster: boolean = false;
  addBankForm: FormGroup;
  constructor(
    private fb1: FormBuilder,
    private bs: CompanyService,
  ) {
    this.addBankForm = this.fb1.group(
      {
        comId: [sessionStorage.getItem('companyId')],
        bankName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
        accountNo: [
          '',
          [
            Validators.required,
            Validators.pattern(/^-?\d*\.?\d+$/),
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        conAccountNo: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ],
        ],
        branchName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z ]+')],
        ],
        ifscCode: [
          '',
          [Validators.required, Validators.pattern(/^[A-Z]{4}0[0-9]{6}$/)],
        ],
      },
      { validator: this.confirmAccountNumberValidator },
    );
  }
  submitBank(data: any) {
    let comId = sessionStorage.getItem('companyId');
    this.bs.insertBank(comId, data).subscribe((res) => {
      console.log(res);
      this.addBankForm.reset();
      sessionStorage.setItem('companyId', data.companyId);
    });
    this.successToster = true;
    this.message = 'Bank Added Successfully';
    this.addBankForm.reset();
  }
  BANK: string = '';
  BRANCH: string = '';
  _ifscfetch: any;
  fetchIfscCode(data: any) {
    const ifscCode = this.addBankForm.get('ifscCode')?.value;
    console.log(ifscCode);
    this.bs.fetchIfsc(ifscCode).subscribe((res) => {
      console.log(res);
      this._ifscfetch = res;

      this.addBankForm.patchValue({
        bankName: this._ifscfetch.BANK,
        branchName: this._ifscfetch.BRANCH,
      });
    });
  }
  confirmAccountNumberValidator(group: FormGroup) {
    const accountNo = group.get('accountNo')?.value;
    const conAccountNo = group.get('conAccountNo')?.value;

    return accountNo === conAccountNo ? null : { mismatch: true };
  }
}
