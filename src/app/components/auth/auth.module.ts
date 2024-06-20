import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { OtpgenComponent } from './otpgen/otpgen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginPageComponent, OtpgenComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule,SharedModule],
})
export class AuthModule {}
