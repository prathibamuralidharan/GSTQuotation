import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-c-stock-out',
  templateUrl: './c-stock-out.component.html',
  styleUrl: './c-stock-out.component.css',
})
export class CStockOutComponent {
  suggestions: string[] = [];
  selectedSuggestion: string | null = null;
  isShowbox: boolean = false;
  stackInandOutDto: any[] = [];
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

      this.isShowbox = true;
    });
  }

  selectSuggestion(suggestion: string) {
    this.selectedSuggestion = suggestion;
    (document.getElementById('voice-search') as HTMLInputElement).value =
      suggestion;
    this.suggestions = [];
  }
}
