import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-p-list',
  templateUrl: './p-list.component.html',
  styleUrl: './p-list.component.css',
})
export class PListComponent implements OnInit {
  constructor(private product: ProductService) {}
  _Product: any;
  companyId: any;
  isCloseUpdate: Boolean = false;

  productData: any;

  ngOnInit(): void {
    this.companyId = sessionStorage.getItem('companyId');
    this.fetchProductlist();
  }

  fetchProductlist() {
    this.product.viewProduct(this.companyId).subscribe((res: any) => {
      console.log(res);
      this._Product = res;
    });
  }

  closeUpdate(close: Boolean) {
    this.isCloseUpdate = close;
  }
  viewProduct(data: any) {
    this.isCloseUpdate = true;
    this.productData = data;
  }
}
