import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { OtpgenComponent } from './otpgen/otpgen.component';

const routes: Routes = [
  { component: OtpgenComponent, path: 'otp' },
  {
    component: LoginPageComponent,
    path: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
