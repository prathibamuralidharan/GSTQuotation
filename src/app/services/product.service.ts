import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint } from '../../environments/environment.apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  addgroup(data: any, comId: any) {
    return this.http.post(endPoint.addgroupproduct + comId, data);
  }
  getlist(comId: any) {
    return this.http.get(endPoint.getgroup + comId);
  }

  addcategory(data: any, id: any) {
    return this.http.post(endPoint.addnewcategory + '/' + id, data);
  }
  addproduct(Id: any, data: any) {
    return this.http.post(endPoint.addnewproduct + Id, data);
  }
  addBrand(id: any, Data: any) {
    return this.http.post(endPoint.addnewbrand + id, Data);
  }
  categoryList() {
    return this.http.get(endPoint.getcategory);
  }
  brandList(id: any) {
    return this.http.get(endPoint.getbrand + id);
  }
  getAllCatList(grpID: any) {
    return this.http.get(endPoint.getcategory + grpID);
  }

  viewProduct(comId: any) {
    return this.http.get(endPoint.getallproduct + comId + '/details');
  }
  upDate(id: any, updateData: any) {
    return this.http.post(endPoint.updateProduct + id, updateData);
  }
}
