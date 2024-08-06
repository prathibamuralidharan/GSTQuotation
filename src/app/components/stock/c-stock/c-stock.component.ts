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
  productGroups: any;
  catList: any;
  brand: any;
  message: string = '';
  addstockform: FormGroup;

  constructor(
    private fb1: FormBuilder,
    private pser: ProductService,
    private router: Router,
    private service: QuotationService,
  ) {
    this.addstockform = this.fb1.group({
      prdGrpId: ['', Validators.required],
      prdCateId: ['', Validators.required],
      prdBrandId: ['', Validators.required],
      prdModel: ['', Validators.required],
      prdDescription: ['', Validators.required],
      prdHsn: ['', Validators.required],
      prdUnitPrice: ['', Validators.required],
      prdGstStatus: ['', Validators.required],
      prdGstPercent: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getallgroup();
  }

  isgroup: boolean = false;
  iscategory: boolean = false;
  isbrand: boolean = false;

  addgroup(data: any) {
    let comId = sessionStorage.getItem('companyId');
    let grp = { prdGrop: data };
    console.log(comId);
    this.pser.addgroup(grp, comId).subscribe(
      (res) => {
        console.log(res);
        //  console.log(data);
        this.isgroup = false;
        this.addstockform.reset();
      },
      (error) => {
        console.error('Error adding group:', error);
      },
    );
  }
  getallgroup() {
    let comId = sessionStorage.getItem('companyId');
    this.pser.getlist(comId).subscribe((res) => {
      console.log(res);
      this.productGroups = res;
    });
  }
  getCatList(data: any) {
    this.pser.getAllCatList(data).subscribe(
      (res) => {
        console.log(res);
        this.catList = res;
        this.iscategory = false;
      },

      (error: any) => {
        if (error.status == 404) {
          this.catList = undefined;
        }
      },
    );
  }

  getBand(data: any) {
    console.log(data);

    this.pser.brandList(data).subscribe(
      (res) => {
        this.brand = res;
        console.log(res);
      },
      (error: any) => {
        if (error.status == 404) {
          this.brand = undefined;
        }
      },
    );
  }

  addcate(id: any, data: any) {
    let cat = { prdCategory: data };

    this.pser.addcategory(cat, id).subscribe((res) => {
      console.log(res);
      this.iscategory = false;
      this.addstockform.reset();
    });
  }
  addBrand(id: any, data: any) {
    let brand = { prdBrand: data };
    console.log(brand);

    this.pser.addBrand(id, brand).subscribe((res) => {
      console.log(res);
      this.isbrand = false;
      this.addstockform.reset();
    });
  }
  _modelList: any;
  getModelList(prdBrandId: any) {
    console.log(prdBrandId);

    this.service.getModelList(prdBrandId).subscribe(
      (res: any) => {
        if (res != null) {
          this._modelList = res;
        } else {
          this._modelList = null;
        }
        console.log(res);
      },
      (error) => {
        console.error('Error fetching model list:', error);
      },
    );
  }
  _description: any;
  getDescriptionList(desc: any) {
    console.log(desc);

    this.service.getDescriptionList(desc).subscribe((res: any) => {
      if (res != null) {
        this._description = res;
      } else {
        this._description = null;
      }
      console.log(res);
    });
  }
  productData: any;
  getProduct(data: any) {
    this.service.getProduct(data).subscribe((res) => {
      this.productData = res;
      console.log(res);
      this.addstockform.patchValue({
        prdUnitPrice: this.productData.prdUnitPrice,
        prdGstPercent: this.productData.prdGstPercent,
        prdGstStatus: this.productData.prdGstStatus,
        prdHsn: this.productData.prdHsn,
      });
    });
  }
  addprod(brandId: any, data: any) {
    console.log(data);

    this.pser.addproduct(brandId, data).subscribe((res) => {
      console.log(res);
      this.addstockform.reset();
      this.message = 'Product Added Successfully';
      this.router.navigate(['/home/quote']);
    });
  }
}
