import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupRoutingModule } from './startup-routing.module';
import { HomeComponent } from './home/home.component';
import { SidemenuComponent } from '../layout/sidemenu/sidemenu.component';
import { HeaderComponent } from '../layout/header/header.component';


@NgModule({
  declarations: [
    HomeComponent,
    SidemenuComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    StartupRoutingModule
  ]
})
export class StartupModule { }
