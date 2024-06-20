import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidemenuComponent } from './components/layout/sidemenu/sidemenu.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
