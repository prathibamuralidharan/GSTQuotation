import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-c-stock',
  templateUrl: './c-stock.component.html',
  styleUrl: './c-stock.component.css',
})
export class CStockComponent implements OnInit {
  suggestions: string[] = [];
  selectedSuggestion: string | null = null;
  isShowbox: boolean = false;
  prdcode: any;

  constructor(
    private pser: ProductService,
    private stock: StockService,
  ) {}
  ngOnInit(): void {}

  _product: any;
  getPrdCode(productcode: any) {
    this.prdcode = productcode;
    console.log('Hello', productcode);
  }
  _prdID: any;
  searchProductId() {
    const comId = sessionStorage.getItem('companyId');
    this.pser.stockSearch(comId, this.prdcode).subscribe((res) => {
      console.log(res);
      this._product = res;
      this._prdID = this._product.prdId;
      console.log('productId:', this._prdID);

      this.isShowbox = true;
    });
  }

  selectSuggestion(suggestion: string) {
    this.selectedSuggestion = suggestion;
    (document.getElementById('voice-search') as HTMLInputElement).value =
      suggestion;
    this.suggestions = [];
  }
  submitStock(stodata: any) {
    this.stock.stockInward(stodata).subscribe((res: any) => {
      console.log(res);
    });
  }
  inward: any;
  stockinValue(Stockin: any) {
    this.inward = Stockin;
    console.log('stockin', Stockin);
  }
}
