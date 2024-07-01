import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotCreateComponent } from './quot-create/quot-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  LQuatationComponent,
  LQuatationComponent as LQuotationComponent,
} from './l-quatation/l-quatation.component';
import { VPdfQuotationComponent } from './v-pdf-quatation/v-pdf-quatation.component';

@NgModule({
  declarations: [
    QuotCreateComponent,
    LQuatationComponent,
    VPdfQuotationComponent,
  ],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class QuotationModule {}
