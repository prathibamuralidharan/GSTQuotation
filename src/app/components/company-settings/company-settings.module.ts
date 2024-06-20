import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { BaseSettingsComponent } from './base-settings/base-settings.component';
import { SSidebarComponent } from './s-sidebar/s-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingMenuModule } from './setting-menu/setting-menu.module';



@NgModule({
  declarations: [
    BaseSettingsComponent,
    SSidebarComponent,
   
  ],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SettingMenuModule
  ]
})
export class CompanySettingsModule { }
