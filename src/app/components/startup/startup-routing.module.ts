import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductModule } from '../product/product.module';
import { CompanySettingsModule } from '../company-settings/company-settings.module';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('../customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../quotation/quotation.module').then(
            (m) => m.QuotationModule
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../product/product.module').then((m) => ProductModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('../company-settings/company-settings.module').then(
            (m) => CompanySettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartupRoutingModule {}
