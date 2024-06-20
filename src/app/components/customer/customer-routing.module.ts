import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CusCreateComponent } from './cus-create/cus-create.component';
import { CusListComponent } from './cus-list/cus-list.component';
import { CusViewComponent } from './cus-view/cus-view.component';


const routes: Routes = [
  {
    path:'addcustomer', component:CusCreateComponent},
    {path:'listCustomer',component:CusListComponent},
  {path:'viewCustomer',component:CusViewComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { 
  
}
