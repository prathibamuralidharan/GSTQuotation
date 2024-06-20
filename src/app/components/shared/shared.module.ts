import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TosterComponent } from './toster/toster.component';
import { SuccessPopupComponent } from './success-popup/success-popup.component';

@NgModule({
  declarations: [TosterComponent, SuccessPopupComponent],
  imports: [CommonModule],
  exports: [TosterComponent, SuccessPopupComponent],
})
export class SharedModule {}
