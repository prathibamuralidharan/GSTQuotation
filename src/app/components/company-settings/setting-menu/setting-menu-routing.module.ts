import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CProfileComponent } from './c-profile/c-profile.component';
import { BCreateComponent } from './b-create/b-create.component';
import { BListComponent } from './b-list/b-list.component';
import { BViewComponent } from './b-view/b-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VCprofileComponent } from './v-cprofile/v-cprofile.component';
import { SignatureComponent } from './signature/signature.component';

const routes: Routes = [
  { path: 'companyProfile', component: CProfileComponent },
  {
    path: 'bankDetail',
    component: BCreateComponent,
  },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'listBank', component: BListComponent },
  { path: 'viewBank', component: BViewComponent },
  { path: 'viewCompany', component: VCprofileComponent },
  { path: 'sign', component: SignatureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingMenuRoutingModule {}
