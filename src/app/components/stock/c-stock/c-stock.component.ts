import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-stock',
  templateUrl: './c-stock.component.html',
  styleUrl: './c-stock.component.css',
})
export class CStockComponent implements OnInit {
  suggestions: string[] = [];
  selectedSuggestion: string | null = null;

  constructor(private pser: ProductService) {}
  ngOnInit(): void {
    this.listProductDetails();
  }

  prd: any;
  prdAutoId: any;
  listProductDetails() {
    const comId = sessionStorage.getItem('companyId');
    this.pser.viewProduct(comId).subscribe((res) => {
      console.log(res);
      this.prd = res;
      if (this.prd && this.prd.length > 0) {
        this.prdAutoId = this.prd[0].prdAutoId;
      }
      console.log('ProductId:', this.prdAutoId);
    });
  }
  _product: any;
  searchProductId() {
    const comId = sessionStorage.getItem('companyId');
    this.pser.stockSearch(comId, this.prdAutoId).subscribe((res) => {
      console.log(res);
      this._product = res;
    });
  }

  selectSuggestion(suggestion: string) {
    this.selectedSuggestion = suggestion;
    (document.getElementById('voice-search') as HTMLInputElement).value =
      suggestion;
    this.suggestions = [];
  }
}
