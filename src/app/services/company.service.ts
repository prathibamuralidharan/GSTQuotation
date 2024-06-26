import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endPoint } from '../../environments/environment.apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}
  addNewCompany(com: any) {
    return this.http.post(
      endPoint.AddCompany + sessionStorage.getItem('companyId'),
      com,
    );
  }
  uploadLogo(file: FormData) {
    return this.http.post(
      endPoint.addLogo + sessionStorage.getItem('companyId'),
      file,
    );
  }
  uploadSignature(file1: FormData) {
    return this.http.post(
      endPoint.addSignature + sessionStorage.getItem('companyId'),
      file1,
    );
  }
  fetchIfsc(ifsc: any) {
    return this.http.get(endPoint.ifsccode + ifsc);
  }
  getcompany() {
    return this.http.get(
      endPoint.viewCompany + sessionStorage.getItem('companyId'),
    );
  }
  insertBank(comId: any, bank: any) {
    return this.http.post(endPoint.addBank + comId, bank);
  }
  getBank(comId: any) {
    return this.http.get(endPoint.listBank + comId);
  }
  getBankbyId(gbank: any) {
    return this.http.get(endPoint.getBankId + gbank);
  }
  updateBank(vbank: any, id: any) {
    return this.http.post(endPoint.updateBank + id, vbank);
  }
}
