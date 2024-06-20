import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { CustomerModule } from './components/customer/customer.module';
import { StartupModule } from './components/startup/startup.module';
import { QuotationModule } from './components/quotation/quotation.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductModule } from './components/product/product.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanySettingsModule } from './components/company-settings/company-settings.module';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CustomerModule,
    ProductModule,
    StartupModule,
    QuotationModule,
    HttpClientModule,
    ReactiveFormsModule,
    CompanySettingsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
