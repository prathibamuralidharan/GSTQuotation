import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotCreateComponent } from './quot-create/quot-create.component';
import { LQuatationComponent } from './l-quatation/l-quatation.component';
import { VPdfQuatationComponent } from './v-pdf-quatation/v-pdf-quatation.component';

const routes: Routes = [
  { path: 'quote', component: QuotCreateComponent },
  { path: 'listquote', component: LQuatationComponent },
  {
    path: 'pdf',
    component: VPdfQuatationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationRoutingModule {}
