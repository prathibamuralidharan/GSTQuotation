import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { CStockComponent } from './c-stock/c-stock.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CStockOutComponent } from './c-stock-out/c-stock-out.component';

@NgModule({
  declarations: [CStockComponent, CStockOutComponent],
  imports: [CommonModule, StockRoutingModule, ReactiveFormsModule],
})
export class StockModule {}
