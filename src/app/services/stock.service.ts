import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint } from '../../environments/environment.apiEndPoint';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}
  stockInward(stIn: any) {
    const ComId = sessionStorage.getItem('companyId');
    return this.http.post(endPoint.stockIn + ComId, stIn);
  }
}
