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
  isPdfClose: Boolean = false;
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
  isfadeOutDown = false;

  viewQuotationPdf(quoId: any) {
    this.isPdfClose = true;
    console.log('id', quoId);
    this.quoId = quoId;
    const selectedQuotation = this._quotationList.find(
      (quotation: { id: string }) => quotation.id === quoId,
    );
  }
  handleClosePdfView(event: Boolean) {
    this.isPdfClose = event;
  }
}
