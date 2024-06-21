import { Component, OnInit } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';

@Component({
  selector: 'app-l-quatation',
  templateUrl: './l-quatation.component.html',
  styleUrl: './l-quatation.component.css',
})
export class LQuatationComponent implements OnInit {
  currentDate: string = '';
  quoId: number | undefined;
  constructor(private quoService: QuotationService) {}
  ngOnInit() {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];
    this.quotationList();
  }
  _quotationList: any;
  _quotationId: any;
  quotationList() {
    const comId = sessionStorage.getItem('companyId');
    this.quoService.getQuotation(comId).subscribe((res) => {
      console.log('ddd', res);
      this._quotationList = res;
    });
  }

  isPopupVisible = false;
  isfadeOutDown = false;

  viewQuotationPdf(quoId: any) {
    console.log('id', quoId);
    this.quoId = quoId;
    const selectedQuotation = this._quotationList.find(
      (quotation: { id: string }) => quotation.id === quoId,
    );
    if (selectedQuotation) {
      this.isPopupVisible = true;
      console.log('Selected Quotation:', selectedQuotation);
    } else {
      console.error('Quotation not found with ID:', quoId);
    }
  }
  closePdf(close: boolean) {
    this.isPopupVisible = close;
  }
}
