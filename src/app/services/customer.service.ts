import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endPoint } from '../../environments/environment.apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}
  addCustomer(comId: any, cus: any) {
    return this.http.post(endPoint.addAllCustomer + comId, cus);
  }
  ViewCustomer(view: any) {
    return this.http.get(endPoint.listCustomer + view);
  }
  getCustomerId(cusid: any) {
    return this.http.get(endPoint.getCustomerId + cusid);
  }
  updatecustomer(id: any, updateData: any) {
    return this.http.post(endPoint.updateCustomer + '/' + id, updateData);
  }
  addressUpdate(cusid: any, add: any) {
    return this.http.post(endPoint.updateCusAdd + '/' + cusid, add);
  }
}
