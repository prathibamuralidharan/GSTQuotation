import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  public email: any;
  public companyData:any



  gstCalculation(
    unitPrice: number,
    quantity: number,
    gstPercent: number,
    gstStatus: number,
  ) {
    let basePrice, gstAmt, taxAmt, mul;

    if (gstStatus === 1) {
      // GST Inclusive
      basePrice = unitPrice / (1 + gstPercent / 100);
      gstAmt = unitPrice - basePrice;
      taxAmt = unitPrice * quantity;
      mul=basePrice*quantity;
    } else {
      // GST Exclusive
      basePrice = unitPrice;
      gstAmt = (unitPrice * gstPercent) / 100;
      taxAmt = (unitPrice + gstAmt) * quantity;
    }

    return {
      basePrice,
      gstAmt,
      TaxAmt: taxAmt,
      mul,
    };
  }
  
  
  
}
