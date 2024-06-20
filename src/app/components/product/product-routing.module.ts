import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PCreateComponent } from './p-create/p-create.component';
import { PListComponent } from './p-list/p-list.component';
import { PViewComponent } from './p-view/p-view.component';
import { CatCreatepopComponent } from './cat-createpop/cat-createpop.component';


const routes: Routes = [
{path:'cproduct',component:PCreateComponent},
{path:'lproduct',component:PListComponent},
{path:'vproduct',component:PViewComponent},
{path:'ccat',component:CatCreatepopComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
