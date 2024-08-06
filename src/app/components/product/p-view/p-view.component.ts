import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-p-view',
  templateUrl: './p-view.component.html',
  styleUrls: ['./p-view.component.css'],
})
export class PViewComponent implements OnInit, OnChanges {
  @Output() closeCustomer = new EventEmitter<boolean>();
  @Input() productData: any; // Assuming productData type is known, adjust as necessary

  isSave = false;
  isEdit = true;
  isSaveIcon = true;
  isDelete = false;

  productGroups: any[] = [];
  catList: any[] = [];
  brand: any[] = [];
  isgroup = false;
  iscategory = false;
  isbrand = false;

  successToster = false;
  message = '';
  updateProduct: FormGroup;

  _productDetails: any;

  constructor(
    private ufb: FormBuilder,
    private product: ProductService,
  ) {
    this.updateProduct = this.ufb.group({
      prdId: [],
      prdGrpId: [],
      prdCateId: [],
      prdBrandId: [],
      prdModel: [],
      prdDescription: [],
      prdHsn: [],
      prdUnitPrice: [],
      prdGstStatus: [],
      prdGstPercent: [],
      prdStackQuantity: [],
    });
  }

  ngOnInit() {
    this.fetchCustomerDetails();
    this.disableFormControls();
    this.getAllGroup();
    this.getCatList(this.productData.prdGrpId);
    this.getBrand(this.productData.prdCateId);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productData'] && changes['productData'].currentValue) {
      this.updateProduct.patchValue(this.productData);
      this.disableFormControls();
    }
  }

  private disableFormControls() {
    Object.keys(this.updateProduct.controls).forEach((form) => {
      this.updateProduct.get(form)?.disable();
    });
  }

  edit() {
    Object.keys(this.updateProduct.controls).forEach((form) => {
      this.updateProduct.get(form)?.enable();
    });
    this.isSave = true;
    this.isEdit = false;
  }

  fetchCustomerDetails() {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      this.product.viewProduct(comId).subscribe(
        (res: any) => {
          this.productData = res;
          console.log(this.productData);
          this.updateProduct.patchValue(this.productData);
        },
        (error) => {
          console.error('Error fetching product details', error);
          // Handle error appropriately
        },
      );
    }
  }

  addGroup(data: any) {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      const grp = { prdGrop: data };
      this.product.addgroup(grp, comId).subscribe(
        (res) => {
          this.isgroup = !this.isgroup;
        },
        (error) => {
          console.error('Error adding group', error);
          // Handle error appropriately
        },
      );
    }
  }

  getAllGroup() {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      this.product.getlist(comId).subscribe(
        (res: any) => {
          this.productGroups = res;
        },
        (error) => {
          console.error('Error fetching group list', error);
          // Handle error appropriately
        },
      );
    }
  }

  getCatList(data: any) {
    this.product.getAllCatList(data).subscribe(
      (res: any) => {
        this.catList = res;
      },
      (error) => {
        if (error.status === 404) {
          this.catList = [];
        } else {
          console.error('Error fetching category list', error);
          // Handle error appropriately
        }
      },
    );
  }

  getBrand(data: any) {
    this.product.brandList(data).subscribe(
      (res: any) => {
        this.brand = res;
      },
      (error) => {
        if (error.status === 404) {
          this.brand = [];
        } else {
          console.error('Error fetching brand list', error);
          // Handle error appropriately
        }
      },
    );
  }

  addCategory(id: any, data: any) {
    const category = { prdCategory: data };
    this.product.addcategory(category, id).subscribe(
      (res) => {
        console.log('Category added', res);
      },
      (error) => {
        console.error('Error adding category', error);
        // Handle error appropriately
      },
    );
  }

  addBrand(id: any, data: any) {
    const brand = { prdBrand: data };
    this.product.addBrand(id, brand).subscribe(
      (res) => {
        this.isbrand = false;
      },
      (error) => {
        console.error('Error adding brand', error);
        // Handle error appropriately
      },
    );
  }

  updateProductDetails(data: any) {
    console.log(data);
    let id = this.updateProduct.get('prdId')?.value;
    console.log(id);

    this.product.upDate(id, data).subscribe((res) => {
      console.log(res);
    });
  }
}
