import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  imageData: any;
  imageUrl: any;

  isDeleteAddress: boolean = true;
  isSaveAddress: boolean = false;

  _viewCompany: any;

  constructor(
    private fb1: FormBuilder,
    private ser: CompanyService,
    private shared: SharedService,
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

      comLandLine: [],
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

      companyAddressDto: this.fb1.array([this.showaddress()]),
    });
  }

  get companyAddressDto() {
    return this.addcompany.get('companyAddressDto') as FormArray;
  }
  showaddress() {
    return this.fb1.group({
      comBAdd1: ['', [Validators.required]],
      comBAdd2: ['', [Validators.required]],

      comBPcode: [
        '',
        [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)],
      ],

      comBCity: ['', Validators.required],

      comBState: ['', Validators.required],
    });
  }
  addAddress() {
    this.companyAddressDto.push(this.showaddress());
  }
  ngOnInit(): void {
    this.fetchCompanyProfile();
    this.retrieveComLogo();
  }
  fetchCompanyProfile() {
    this.ser.getcompany().subscribe((res) => {
      this._viewCompany = res;
      console.log(this._viewCompany);

      this.shared.companyData = res;
      console.log(res);

      this.addcompany.patchValue(this._viewCompany);

      this.comAddId = this._viewCompany.companyAddressDto.map(
        (item: any) => item.comAddId,
      );
      console.log(this.comAddId);
    });
  }

  // patchAddressValues(addresses: any[]): void {
  //   const addressArray = this.addcompany.get('companyAddressDto') as FormArray;
  //   addressArray.clear(); // Clear existing addresses before patching new ones

  //   addresses.forEach((address) => {
  //     addressArray.push(
  //       this.fb1.group({
  //         comAddId: [address.comAddId], // Assuming comAddId is part of address object
  //         comAddressStatus: [address.comAddressStatus], // Assuming comAddressStatus is part of address object
  //         comBAdd1: [address.comBAdd1, Validators.required],
  //         comBAdd2: [address.comBAdd2, Validators.required],
  //         comBPcode: [
  //           address.comBPcode,
  //           [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)],
  //         ],
  //         comBCity: [address.comBCity, Validators.required],
  //         comBState: [address.comBState, Validators.required],
  //       }),
  //     );
  //   });
  // }

  SubmitCompany(data: any) {
    console.log(data);

    this.ser.addNewCompany(data).subscribe(
      (res: any) => {
        console.log(data);

        this.successToster = true;
        this.message = 'Company Updated Successfully';
        this.addcompany.reset();
      },
      (error) => {
        if (error.status == 200) {
          this.addcompany.reset();
          this.fetchCompanyProfile();
        }
      },
    );
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

  retrieveComLogo() {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      this.ser.getCompanyLogo(comId).subscribe(
        (res: any) => {
          console.log(res);
          this.imageData = res.comLogo; // Assuming res.comLogo is base64 encoded image data
          this.previewUrl = 'data:image/jpeg;base64,' + this.imageData; // Adjust format based on actual image type
        },
        (error) => {
          console.error('Error fetching company logo:', error);
          // Handle error scenario, e.g., display a default image or show an error message
        },
      );
    } else {
      console.error('Company ID not found in session storage');
      // Handle scenario where company ID is missing from session storage
    }
  }

  addressDelete() {
    this.ser.softDeleteAddress(this.comAddId).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if (error.status == 200) {
          this.addcompany.reset();
          this.fetchCompanyProfile();
        }
      },
    );
    this.isDeleteAddress = false;
    this.isSaveAddress = true;
  }
  comAddId(comAddId: any) {
    throw new Error('Method not implemented.');
  }
  addAddressApi(data: any) {
    console.log(data);
    const { companyAddressDto } = data;
    let address = { ...companyAddressDto[0] };

    const comId = sessionStorage.getItem('companyId');
    this.ser.addressAdd(comId, address).subscribe(
      (res) => {
        console.log('address', res);
      },
      (error) => {
        if (error.status == 200) {
          this.fetchCompanyProfile();
        }
      },
    );
    this.isSaveAddress = false;
    this.isDeleteAddress = true;
  }
}
