import { Component } from '@angular/core';

@Component({
  selector: 'app-s-sidebar',
  templateUrl: './s-sidebar.component.html',
  styleUrl: './s-sidebar.component.css'
})
export class SSidebarComponent {
  isDropdown:boolean=false
  toggleDropdown(){
    this.isDropdown = !this.isDropdown;
  }
}
