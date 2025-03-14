import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company.service';

@Component({
  selector: 'app-quot-create',
  templateUrl: './quot-create.component.html',
  styleUrl: './quot-create.component.css',
})
export class QuotCreateComponent implements OnInit {
  visiable: boolean = false;
  successPopup: boolean = false;
  successMessage: string = '';
  _rItemList: any;
  emptyVisiable: boolean = true;
  showDeliveryCharge = false;
  showInstallationCharge = false;
  terms: string = '';
  notes: string = '';
  showText = false;
  isDelivery: boolean = false;
  isInstall: boolean = false;
  currentDate: string = '';
  modelList: any;
  productData: any;
  isCharge: boolean = false;
  productList: any[] = [];
  _totalAmt: number = 0;
  _gstAmt: number = 0;
  _sgstAmt: number = 0;
  _igstAmt: number = 0;
  _cgstAmt: number = 0;

  deliveryCharge: number = 0;
  installationCharge: number = 0;
  deliveryChargeGst: number = 0;
  installationChargeGst: number = 0;
  productListSGSTCGST = [];
  productListIGST = [];

  _companyGstIn: string = ''; // Assuming _companyGstIn holds the company's GST number
  _customerGstIn: string = '';

  _bankName: any[] = [];
  addQuoteForm: FormGroup;
  product: any;
  constructor(
    private service: QuotationService,
    private companyService: CompanyService,
    private qfb: FormBuilder,
    private shared: SharedService,
    private route: Router,
  ) {
    this.addQuoteForm = this.qfb.group({
      prdGroup: [],
      prdCategory: [],
      prdBrand: [],
      prdModel: [],
      prdUnitPrice: [],
      prdGstPercent: [],
      prdQuantity: [],
      prdGstStatus: [],
    });
  }

  ngOnInit(): void {
    this.terms = this.service.getTerms();
    this.notes = this.service.getTerm();

    this.listBankDetails();
    this.listCustomerDetails();
    this.getAllGroup();
    this.autoGen();
    this.companygst();
  }

  toggleTextarea() {
    this.showDeliveryCharge = !this.showDeliveryCharge;
  }

  toggleTextarea1() {
    this.showInstallationCharge = !this.showInstallationCharge;
  }

  saveTerms(deliveryChargeInput: HTMLInputElement): void {
    const delivery = deliveryChargeInput.value;
    console.log(delivery);
    this.deliveryCharge = parseFloat(delivery);
    this.deliveryChargeGst = this.calculateGst(this.deliveryCharge);
    this.showDeliveryCharge = false;
    this.isDelivery = true;
    this.updateTotalAmount();
    deliveryChargeInput.value = '';
  }

  saveTerms1(installChargeInput: HTMLInputElement): void {
    const install = installChargeInput.value;
    console.log(install);
    this.installationCharge = parseFloat(install);
    this.installationChargeGst = this.calculateGst(this.installationCharge);
    this.showInstallationCharge = false;
    this.isInstall = true;
    this.updateTotalAmount();
    installChargeInput.value = '';
  }

  clearTerms(): void {
    this.terms = '';
    this.service.clearTerms();
  }

  toggleText() {
    this.showText = !this.showText;
  }
  saveTerm(): void {
    this.service.saveTerm(this.notes);
  }

  clearTerm(): void {
    this.notes = '';
    this.service.clearTerm();
  }
  _unitprice: number = 0;
  addToBill(data: any) {
    console.log(data);
    let product = this.productData;
    let gstamt = this.shared.gstCalculation(
      data.prdUnitPrice,
      data.prdQuantity,
      data.prdGstPercent,
      data.prdGstStatus,
    );
    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (this.isSameState(this._companyGstIn, this._customerGstIn)) {
      cgst = this.calculateCgst(gstamt.gstAmt);
      sgst = this.calculateSgst(gstamt.gstAmt);
    } else {
      igst = gstamt.gstAmt;
    }

    console.log(gstamt);

    let list = {
      ...product,
      ...gstamt,

      unitPrice: gstamt.basePrice,
      quantity: data.prdQuantity,
      includedtaxAmt: gstamt.TaxAmt,
      gstAmt: gstamt.gstAmt,
      cgstAmt: cgst,
      sgstAmt: sgst,
      igstAmt: igst,
    };

    this._unitprice += gstamt.basePrice;
    this._totalAmt += gstamt.TaxAmt;
    this._gstAmt += gstamt.gstAmt;

    this._cgstAmt += cgst;
    this._sgstAmt += sgst;
    this._igstAmt += igst;

    console.log('hello', this._totalAmt);

    this.productList.push(list);

    this.visiable = true;
    this.emptyVisiable = false;
    console.log(this.productList);
    this.addQuoteForm.reset();
    this.updateTotalAmount();
  }
  updateTotalAmount() {
    this._totalAmt = this.productList.reduce(
      (total, product) => total + product.includedtaxAmt,
      0,
    );
    this._totalAmt +=
      this.deliveryCharge +
      this.deliveryChargeGst +
      this.installationCharge +
      this.installationChargeGst;
    console.log('Total amount updated:', this._totalAmt);
    this._gstAmt = this.productList.reduce(
      (total, product) => total + product.gstAmt,
      0,
    );
    this._cgstAmt = this.productList.reduce(
      (total, product) => total + product.cgstAmt,
      0,
    );
    this._sgstAmt = this.productList.reduce(
      (total, product) => total + product.sgstAmt,
      0,
    );
    this._igstAmt = this.productList.reduce(
      (total, product) => total + product.igstAmt,
      0,
    );
  }

  isSameState(companyGstIn: string, customerGstIn: string): boolean {
    if (!companyGstIn || !customerGstIn) {
      return false;
    }

    // Extract state codes from GSTINs (first two characters)
    const stateCode1 = companyGstIn.substring(0, 2);
    const stateCode2 = customerGstIn.substring(0, 2);
    return stateCode1 === stateCode2;
  }

  listBankDetails() {
    let comId = sessionStorage.getItem('companyId');
    this.service.listBank(comId).subscribe((res: any) => {
      console.log(res);
      this._bankName = res;
    });
  }
  _customerName: any;
  filteredCustomers: any[] = []; // Array to store filtered customer details
  selectedCustomer: any; // Holds the selected customer
  selectedCustomerName: string = '';
  selectedCustomerAddress: string = ''; // Holds the name of the selected customer
  showDropdown: boolean = false;
  _proGroup: any;
  listCustomerDetails() {
    let comId = sessionStorage.getItem('companyId');
    this.service.listCustomer(comId).subscribe((res: any) => {
      console.log(res);
      this._customerName = res;
    });
  }
  customers: any;

  selectCustomer(cus: any) {
    console.log(cus);

    this.customers = cus;

    // Ensure that _customerName is properly initialized before accessing it
    let custlist: any[] = this._customerName || [];

    // Check if cusId is found in the custlist array
    let findGst = custlist.find((f) => f.cusId == cus);

    // Ensure that findGst is not undefined before accessing its properties
    if (findGst) {
      this._customerGstIn = findGst.cusGst;
      console.log(this._customerGstIn);
    } else {
      console.error('Customer GST not found');
      // Handle the case where customer GST is not found
    }
  }

  hideDropdown(): void {
    this.showDropdown = false;
  }
  _id: string = '';
  autoGen() {
    const comId = sessionStorage.getItem('companyId');
    console.log(comId);

    this.service.autoid(comId).subscribe((res: any) => {
      console.log(res);
      this._id = res.quoAutoId;
    });
  }
  _productGroups: any;
  getAllGroup() {
    let comId = sessionStorage.getItem('companyId');
    this.service.getgrouplist(comId).subscribe((res: any) => {
      console.log(res);
      if (res != null) {
        this._productGroups = res;
      } else {
        this._productGroups = null;
      }
    });
  }
  _categories: any;
  onProductGroupChange(prdGrpId: any) {
    console.log(prdGrpId);

    this.service.getCategoryList(prdGrpId).subscribe((res: any) => {
      console.log(res);
      if (res != null) {
        this._categories = res;
      } else {
        this._categories = null;
      }
    });
  }
  _brand: any;
  onBrandCategoryChange(prdCateId: any) {
    console.log(prdCateId);
    this.service.getBrandList(prdCateId).subscribe((res: any) => {
      console.log(res);
      if (res != null) {
        this._brand = res;
      } else {
        this._brand = null;
      }
    });
  }

  getModelList(data: any) {
    console.log(data);

    this.service.getModelList(data).subscribe((res: any) => {
      if (res != null) {
        this.modelList = res;
      } else {
        this.modelList = null;
      }

      console.log(res);
    });
  }

  getProduct(data: any) {
    this.service.getProduct(data).subscribe((res) => {
      this.productData = res;
      console.log(res);
      this.addQuoteForm.patchValue({
        prdUnitPrice: this.productData.prdUnitPrice,
        prdGstPercent: this.productData.prdGstPercent,
        prdGstStatus: this.productData.prdGstStatus,
      });
    });
  }
  quoDate: any;
  quotationDate(date: any) {
    this.quoDate = date;
    console.log(this.quoDate);
  }
  reference: any;
  quoReference(ref: any) {
    this.reference = ref;
    console.log(this.reference);
  }
  cusId: any;
  quoCustomer(cus: any) {
    this.cusId = cus;
    console.log(this.cusId);
  }
  bankId: any;
  quoBank(bank: any) {
    this.bankId = bank;
    console.log(this.bankId);
  }
  quoId: any;
  quoautoId(id: any) {
    this.quoId = id;
    console.log(this.quoId);
  }
  unitPrice: any;
  unitvalue(value: any) {
    this.unitPrice = parseFloat(value);
    console.log(this.unitPrice);
    this.productList.forEach((item) => {
      item.unitPrice = this.unitPrice;
    });
  }
  quant: any;
  quantitynumber(qu: any) {
    this.quant = qu;
    console.log(this.quant);
  }
  gst: any;
  gstvalue(gst: any) {
    this.gst = gst;
    console.log(this.gst);
  }
  status: any;
  gstStatus(sts: any) {
    this.status = sts;
    console.log(this.status);
  }

  submitQuotation() {
    let finalList = {
      quoProductList: this.productList,
      total: this._totalAmt,
      othersCharge: {
        delCharge: this.deliveryCharge,
        instllCharge: this.installationCharge,
      },

      bankId: this.bankId,
      cusId: this.customers,
      quoReference: this.reference,
      quoDate: this.quoDate,
      quoAutoId: this._id,
    };
    this.service
      .addQuote(sessionStorage.getItem('companyId'), finalList)
      .subscribe(
        (res) => {
          console.log(res);
          this.successPopup = true;
          this.successMessage = 'Quotation submitted Successfully';
          this.resetForm();
        },
        (error) => {
          console.error(error);

          if (error.status == 200) {
            this.route.navigate(['/home/listquote']);
          }
        },
      );
    console.log(finalList);
  }
  resetForm() {
    // Resetting form fields to their initial values
    this.productList = [];
    this._totalAmt = 0;
    this.deliveryCharge = 0;
    this.installationCharge = 0;
    this.bankId = null;
    this.customers = null;
    this.reference = '';
    this.quoDate = null;
    this._id = '';
  }

  calculateGst(amount: number): number {
    return amount * 0.18;
  }

  companygst() {
    this.companyService.getcompany().subscribe((res: any) => {
      console.log(res);
      this._companyGstIn = res['comGst']; // Access 'comGst' property
      console.log(this._companyGstIn);
    });
  }

  calculateCgst(gstAmt: number): number {
    return gstAmt / 2; // Assuming CGST rate is 9%
  }

  calculateSgst(gstAmt: number): number {
    return gstAmt / 2; // Assuming SGST rate is 9%
  }

  calculateIgst(gstAmt: number): number {
    return gstAmt; // Assuming IGST is the same as the GST amount
  }
}
