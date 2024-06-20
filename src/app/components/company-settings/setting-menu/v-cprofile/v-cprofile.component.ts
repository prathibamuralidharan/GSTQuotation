import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'app-v-cprofile',
  templateUrl: './v-cprofile.component.html',
  styleUrl: './v-cprofile.component.css'
})
export class VCprofileComponent implements OnInit{
  
  _companyDetails:any
  companyId: any;


  constructor(private ser:CompanyService){
  
   
   
  }
  ngOnInit(): void {
    this.companyId=sessionStorage.getItem('companyId')
    this.ser.getcompany().subscribe((res)=>{
      console.log(res);
      this._companyDetails=res
    })
  }
}
