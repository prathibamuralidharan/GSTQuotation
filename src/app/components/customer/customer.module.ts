import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { CusCreateComponent } from './cus-create/cus-create.component';
import { CusListComponent } from './cus-list/cus-list.component';
import { CusViewComponent } from './cus-view/cus-view.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
  CusCreateComponent,
  CusListComponent,
  CusViewComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomerModule { }
