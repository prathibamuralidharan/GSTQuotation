import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrl: './success-popup.component.css',
})
export class SuccessPopupComponent {
  @Input() successMessage: string | undefined;
}
