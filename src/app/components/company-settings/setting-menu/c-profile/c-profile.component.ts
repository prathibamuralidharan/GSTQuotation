import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
  selector: 'app-c-profile',
  templateUrl: './c-profile.component.html',
  styleUrls: ['./c-profile.component.css'],
})
export class CProfileComponent implements OnInit {
  addcompany: FormGroup;
  addlogo: FormGroup;
  addSign: FormGroup;
  selectedFile: File | null = null;
  selectedSignature: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  previewUrl1: string | ArrayBuffer | null = null;
  signaturePreviewUrl: string | ArrayBuffer | null = null;
  isShippingEnabled: boolean = false;
  message: string = '';
  successToster: boolean = false;
  private _viewCompany: any;

  constructor(
    private fb1: FormBuilder,
    private ser: CompanyService,
    private shared: SharedService
  ) {
    this.addlogo = this.fb1.group({
      comLogo: [null, Validators.required],
    });
    this.addSign = this.fb1.group({
      comSignature: [null, Validators.required],
    });

    this.addcompany = this.fb1.group({
      emailId: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      comName: ['', [Validators.required, Validators.pattern('[A-Za-z ]+')]],
      comEmail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-z]+.([a-z]{2})+(?:\.(com|in|edu|net)){1}$/,
          ),
        ],
      ],
      comBillAndShip: ['', [Validators.required]],
      comBAdd1: ['', [Validators.required]],
      comBAdd2: ['', [Validators.required]],
      comEmailId: [],
      comLandLine: [],
      comSAdd1: ['', [Validators.required]],
      comSAdd2: ['', [Validators.required]],
      comBPcode: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)],
      ],
      comSPcode: ['', [Validators.required]],
      comBCity: ['', Validators.required],
      comSCity: ['', [Validators.required]],
      comBState: ['', Validators.required],
      comSState: ['', [Validators.required]],
      comGst: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z\d]{2}$/),
        ],
      ],
      comPan: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)],
      ],
      comConPerson: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z ]+')],
      ],
      comConPhone: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)],
      ],
      comUrl: [],
    });
  }

  ngOnInit(): void {
    this.fetchCompanyProfile();
  }

  fetchCompanyProfile() {
    this.ser.getcompany().subscribe((res) => {
      this._viewCompany = res;
      this.shared.companyData=res
      console.log(res);

      this.addcompany.patchValue(
      this._viewCompany);
    });
  }

  SubmitCompany(data: any) {
    this.ser.addNewCompany(data).subscribe((res: any) => {
      console.log(data);
      console.log(res);
      this.successToster = true;
      this.message = 'Company Updated Successfully';
      this.addcompany.reset();
    });
  }

  onRadioChange(optionValue: string) {
    if (optionValue == '400') {
      this.isShippingEnabled = true;
    }
    if (optionValue == '200') {
      this.copyBillingToShipping();
      this.isShippingEnabled = false;
    }
  }

  setInitialValue(): void {
    const fetchedValue = '200';
    this.addcompany.get('comBillAndShip')?.setValue(fetchedValue);
  }

  onChangeFile(event: any) {
    const file = event.target.files[0];
    if (
      (file && file.type === 'image/png') ||
      (file && file.type === 'image/jpg') ||
      (file && file.type === 'image/jpeg')
    ) {
      this.selectedFile = file;
      this.addlogo.patchValue({
        comLogo: this.selectedFile,
      });
      console.log(this.selectedFile);
      console.log(this.addlogo);
      
      
      this.previewFile(file);
      this.onSubmit();
    } else {
      alert('Only PNG files are allowed.');
    }
  }
  clearFile() {
    this.selectedFile = null;
    this.previewUrl = null;
    this.addlogo.patchValue({
      comLogo: null,
    });
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer?.files[0];
    if (
      (file && file.type === 'image/png') ||
      (file && file.type === 'image/jpg') ||
      (file && file.type === 'image/jpeg')
    ) {
      this.selectedFile = file;
      this.addlogo.patchValue({
        comLogo: this.selectedFile,
      });
      this.previewFile(file);
    } else {
      alert('Only PNG files are allowed.');
    }
  }

  previewFile(file: File) {
    const reader = new FileReader();
    console.log(file);
    
    reader.onload = (e) => {
      if (e.target?.result) {
        this.previewUrl = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.addlogo.valid && this.selectedFile) {
      const formData = new FormData();
      console.log(formData);
      
      formData.append('comLogo', this.selectedFile);

      this.ser.uploadLogo(formData).subscribe(
        (response) => {
          console.log('Upload successful', response);
        },
        (error) => {
          console.error('Upload error', error);
        },
      );
    }
  }

  copyBillingToShipping(): void {
    console.log(this.addcompany.get('comBAdd1')?.value,'shdg');
    
    this.addcompany.patchValue({
      comSAdd1: this.addcompany.get('comBAdd1')?.value,
      comSAdd2: this.addcompany.get('comBAdd2')?.value,
      comSCity: this.addcompany.get('comBCity')?.value,
      comSState: this.addcompany.get('comBState')?.value,
      comSPcode: this.addcompany.get('comBPcode')?.value,
    });
  }


 
}
