import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { PCreateComponent } from './p-create/p-create.component';
import { PListComponent } from './p-list/p-list.component';
import { PViewComponent } from './p-view/p-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatCreatepopComponent } from './cat-createpop/cat-createpop.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PCreateComponent,
    PListComponent,
    PViewComponent,
    CatCreatepopComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ProductModule {}
