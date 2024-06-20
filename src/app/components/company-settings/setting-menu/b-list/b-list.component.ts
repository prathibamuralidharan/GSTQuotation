import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-b-list',
  templateUrl: './b-list.component.html',
  styleUrl: './b-list.component.css'
})
export class BListComponent implements OnInit{
  
    @Input() id:any
    constructor(private bser:CompanyService){}
    _bankList:any
    companyId:any;
    bankId:any
    ngOnInit(): void {
        this.companyId=sessionStorage.getItem('companyId')
        if(this.companyId){
        this.fetchBankDetails();
        }else{
          console.error('Company ID not found in sessionStorage');
        }
  
       
        }
   fetchBankDetails(){
    this.bser.getBank(this.companyId).subscribe(
      (res: any) => {
        console.log(res);
        this._bankList = res;
      },
      error => {
        console.error(error);
      }
  
  );
   }
   isviewBank:boolean=false
   closeUpdateBank(close:boolean){
    this.isviewBank=close;
   }
   viewBank(data:any){
    this.isviewBank=true
    console.log(data);
    this.bankId=data
    
    // sessionStorage.setItem('bankId',this.bankId)
    // sessionStorage.getItem('bankId')
  
   }
  }

