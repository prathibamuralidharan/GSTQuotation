import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseSettingsComponent } from './base-settings/base-settings.component';

const routes: Routes = [{
  path:'settings',
  component:BaseSettingsComponent,
  children:[{
    path:'',
    loadChildren:()=>
      import('../company-settings/setting-menu/setting-menu.module').then(
        (m)=>m.SettingMenuModule
      )
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanySettingsRoutingModule { }
