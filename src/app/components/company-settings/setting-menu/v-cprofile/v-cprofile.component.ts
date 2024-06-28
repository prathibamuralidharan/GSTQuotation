import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-v-cprofile',
  templateUrl: './v-cprofile.component.html',
  styleUrls: ['./v-cprofile.component.css'],
})
export class VCprofileComponent implements OnInit {
  _companyDetails: any; // Holds the company details fetched from service
  companyId: any; // Holds the current company ID
  imageData: any; // Holds the base64 encoded company logo image data
  signatureData: any; // Holds the base64 encoded company signature data
  signatureUrl: string = ''; // Holds the preview URL for the signature image
  previewUrl: string = ''; // Holds the preview URL for the logo image
  compAddress: any; // Holds company address details
  isAddressVisible: boolean = false; // Controls the visibility of the address section
  _addressList: any; // Holds list of company addresses

  constructor(private ser: CompanyService) {}

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('companyId'); // Retrieve company ID from session storage

    // Fetch company details
    this.ser.getcompany().subscribe((res: any) => {
      console.log(res);
      this._companyDetails = res;

      this._addressList = this._companyDetails.companyAddressDto;
      console.log(this._addressList);
    });

    this.retrieveComLogo();

    this.retrieveSignature();
  }

  // Function to retrieve company logo
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

  retrieveSignature() {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      this.ser.getSignature(comId).subscribe(
        (res: any) => {
          console.log(res);
          this.signatureData = res.comSignature; // Assuming res.comSignature is base64 encoded image data
          this.signatureUrl = 'data:image/jpeg;base64,' + this.signatureData; // Adjust format based on actual image type
        },
        (error) => {
          console.error('Error fetching signature:', error);
          // Handle error scenario, e.g., display a default image or show an error message
        },
      );
    } else {
      console.error('Company ID not found in session storage');
      // Handle scenario where company ID is missing from session storage
    }
  }

  // Function to fetch list of company addresses
}
