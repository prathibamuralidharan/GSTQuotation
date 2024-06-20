import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-cus-list',
  templateUrl: './cus-list.component.html',
  styleUrl: './cus-list.component.css',
})
export class CusListComponent implements OnInit {
  constructor(private cusService: CustomerService) {}
  _customer: any;
  companyId: any;
  custId: any;
  isCloseUpdate: Boolean = false;

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('companyId');
    this.fetchCustomerDetails();
  }
  fetchCustomerDetails() {
    this.cusService.ViewCustomer(this.companyId).subscribe((res: any) => {
      console.log(res);
      this._customer = res;
    });
  }

  closeUpdate(close: Boolean) {
    this.isCloseUpdate = close;
  }
  viewCustomer(data: any) {
    console.log(data);

    this.isCloseUpdate = true;
    this.custId = data;
  }
}
