import { Component } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
})
export class SidemenuComponent {
  isquotation: boolean = false;
  ismaster: boolean = false;
  isStock: boolean = false;
}
