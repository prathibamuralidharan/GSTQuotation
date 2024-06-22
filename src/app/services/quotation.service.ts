import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint } from '../../environments/environment.apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  constructor(private http: HttpClient) {}
  private terms: string = '';
  private notes: string = '';

  getTerms(): string {
    return this.terms;
  }

  saveTerms(terms: string): void {
    this.terms = terms;
  }

  clearTerm(): void {
    this.terms = '';
  }

  getTerm(): string {
    return this.notes;
  }

  saveTerm(notes: string): void {
    this.notes = notes;
  }

  clearTerms(): void {
    this.notes = '';
  }

  //quotation

  listBank(bank: any) {
    return this.http.get(endPoint.listBank + bank);
  }

  listCustomer(customer: any) {
    return this.http.get(endPoint.customerList + customer);
  }

  viewProduct(comId: any) {
    return this.http.get(endPoint.getallproduct + comId + '/details');
  }

  addQuote(id: any, quo: any) {
    return this.http.post(endPoint.addquotation + id, quo);
  }
  autoid(comId: any) {
    return this.http.get(endPoint.quoteid + comId);
  }
  getgrouplist(comId: any) {
    return this.http.get(endPoint.groupList + comId);
  }
  getCategoryList(prdGrpId: any) {
    return this.http.get(endPoint.categoryList + prdGrpId);
  }
  getBrandList(prdCateId: any) {
    return this.http.get(endPoint.brandList + prdCateId);
  }
  getModelList(brandId: any) {
    return this.http.get(endPoint.ModelList + brandId);
  }
  getProduct(data: any) {
    return this.http.get(endPoint.getProduct + data);
  }
  getQuotation(comId: any) {
    return this.http.get(endPoint.listQuotation + comId);
  }
  getAllMasters(quoId: any) {
    return this.http.get(endPoint.updateQuotation + quoId);
  }
}
