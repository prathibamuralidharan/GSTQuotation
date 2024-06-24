import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';

@Component({
  selector: 'app-v-pdf-quatation',
  templateUrl: './v-pdf-quatation.component.html',
  styleUrls: ['./v-pdf-quatation.component.css'],
})
export class VPdfQuatationComponent implements OnInit {
  constructor(private quoService: QuotationService) {}
  @Input() quoId: any;
  @Output() close = new EventEmitter<Boolean>();

  productArray: any;

  ngOnInit(): void {
    console.log('QuotationId', this.quoId);
    this.viewPdf();
  }

  // Function to download the quotation as a PDF
  downloadQuotation(): void {
    const element = document.getElementById('popup-wrapper');
    if (element) {
      const opt: any = {
        margin: 1,
        filename: 'quotation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      // @ts-ignore
      html2pdf().from(element).set(opt).save();
    } else {
      console.error('Element not found');
    }
  }
  closePdfView() {
    this.close.emit(false);
  }
  _allQuoDetails: any;
  viewPdf() {
    this.quoService.getAllMasters(this.quoId).subscribe((res) => {
      console.log(res);

      this._allQuoDetails = res;
      // const { getAllProductDTO } = this._allQuoDetails;
      // this.productArray = getAllProductDTO;
      // console.log(this.productArray);
    });
  }
}
