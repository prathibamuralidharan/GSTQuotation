import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CStockComponent } from './c-stock/c-stock.component';
import { CStockOutComponent } from './c-stock-out/c-stock-out.component';

const routes: Routes = [
  { path: 'stockin', component: CStockComponent },
  { path: 'stockout', component: CStockOutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}
