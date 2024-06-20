let url = 'http://192.168.1.11:4003/';
let url2 = 'http://192.168.1.11:4004/';
let url1 = 'http://192.168.1.11:4001/';
let ifsc = 'https://ifsc.razorpay.com/';
let prod = 'http://192.168.1.11:9004/';

let customer = url1 + 'customer';
let company = url + 'company';
let bank = url + 'Bank';
let pro = prod + 'Product';
let quote = url2 + 'quotation';

export const endPoint = {
  production: false,
  login: company + '/Mailgenerateotp',
  otpVerify: company + '/Mailverifyotp',

  addAllCustomer: customer + '/InsertNewCustomer/',
  listCustomer: customer + '/GetCustomerDetailsList/',
  getCustomerId: customer + '/GetSpecficCusId/',
  updateCustomer: customer + '/UpdateCustomer', //- http://localhost:9004/Product/UpdatePrdGrpIdToAddPrdCatgy/{prdGrpId}

  AddCompany: company + '/AddCompany/', //- http://localhost:9004/Product/UpdatePrdCatgyIdToPrdBrds/{prdCateId}
  addLogo: company + '/uploadComLogo/', //- http://localhost:9004/Product/InsertNewProduct/{prdBrandId}
  addSignature: company + '/uploadComSign/', //-http://localhost:4003/company/uploadComSign/{comId}
  viewCompany: company + '/',

  addBank: bank + '/InsertNewBank/',
  ifsccode: ifsc,
  listBank: bank + '/BankListbyCompId/',
  getBankId: bank + '/getSpecificBankId/',
  updateBank: bank + '/updateBank/',

  //post
  addgroupproduct: pro + '/InsertNewProductGroup/', //GET –http://localhost:9004/Product/getListProductGroup
  addnewcategory: pro + '/UpdatePrdGrpIdToAddPrdCatgy',
  addnewbrand: pro + '/UpdatePrdCatgyIdToPrdBrds/',
  addnewproduct: pro + '/InsertNewProduct/',

  //get
  getgroup: pro + '/getListProductGroup/',
  getcategory: pro + '/UseGrpIdToGetonlyCategoryNameList/',
  getbrand: pro + '/UseCatgyIdToGetonlyBrandNameList/',

  getallproduct: pro + '/company/',

  updateProduct: pro + '/UpdateProduct/',
  //quote
  addquotation: quote + '/InsertNewQuotation/',

  quoteid: quote + '/getQuoGenIdByquoId/', //http://localhost:4004/quotation/getQuoGenIdByquoId/{comId}
  customerList: quote + '/GetCustomerDetailsList/',
  groupList: quote + '/GetPrductGrpList/',
  categoryList: quote + '/UseGrpIdToGetonlyCategyList/',
  brandList: quote + '/UseCatgyIdToGetonlyPrdBrdList/',
  ModelList: quote + '/getListPrdModelByBrdId/',
  getProduct: quote + '/ProductDetails/',
  listQuotation: quote + '/QuoListbyCompId/',
  updateQuotation: quote + '/GetAllMasterInQuoByQuoId/',
};
