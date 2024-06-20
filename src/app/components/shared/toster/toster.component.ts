import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toster',
  templateUrl: './toster.component.html',
  styleUrl: './toster.component.css'
})
export class TosterComponent {
 @Input() message:string | undefined 
}
