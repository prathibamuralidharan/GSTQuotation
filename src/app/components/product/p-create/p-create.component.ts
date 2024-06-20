import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-p-create',
  templateUrl: './p-create.component.html',
  styleUrl: './p-create.component.css',
})
export class PCreateComponent implements OnInit {
  productGroups: any;
  catList: any;
  brand: any;

  addProductForm: FormGroup;

  constructor(
    private fb1: FormBuilder,
    private pser: ProductService,
  ) {
    this.addProductForm = this.fb1.group({
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
    this.pser.addgroup(grp, comId).subscribe((res) => {
      console.log(res);
      console.log(data);
      this.isgroup = !this.isgroup;
    });
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
    });
  }
  addBrand(id: any, data: any) {
    let brand = { prdBrand: data };
    console.log(brand);

    this.pser.addBrand(id, brand).subscribe((res) => {
      console.log(res);
      this.isbrand = false;
    });
  }
  addprod(brandId: any, data: any) {
    console.log(data);

    this.pser.addproduct(brandId, data).subscribe((res) => {
      console.log(res);
    });
  }
}
