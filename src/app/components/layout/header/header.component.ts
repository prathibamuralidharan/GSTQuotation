import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  profile: boolean = false;
  imageData: any;
  previewUrl: any;
  companyName: any;
  constructor(private ser: CompanyService) {}
  ngOnInit() {
    this.retrieveComLogo();
  }
  signOut() {
    sessionStorage.clear();
  }
  toggleSetting() {
    this.profile = !this.profile;
    setTimeout(() => {
      this.profile = false;
    }, 5000);
  }
  retrieveComLogo() {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      this.ser.getCompanyLogo(comId).subscribe(
        (res: any) => {
          console.log(res);
          this.imageData = res.comLogo;
          this.companyName = res.comName; // Assuming res.comLogo is base64 encoded image data
          this.previewUrl = 'data:image/jpeg;base64,' + this.imageData;
          console.log(this.previewUrl);
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
}
