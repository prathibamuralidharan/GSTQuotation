import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingMenuRoutingModule } from './setting-menu-routing.module';
import { CProfileComponent } from './c-profile/c-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BCreateComponent } from './b-create/b-create.component';
import { BListComponent } from './b-list/b-list.component';
import { BViewComponent } from './b-view/b-view.component';
import { VCprofileComponent } from './v-cprofile/v-cprofile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { SignatureComponent } from './signature/signature.component';

@NgModule({
  declarations: [
    CProfileComponent,
    BCreateComponent,
    BListComponent,
    BViewComponent,
    VCprofileComponent,
    UserProfileComponent,
    SignatureComponent,
  ],
  imports: [
    CommonModule,
    SettingMenuRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
})
export class SettingMenuModule {}
