import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { QuotationService } from '../../../services/quotation.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-v-pdf-quatation',
  templateUrl: './v-pdf-quatation.component.html',
  styleUrls: ['./v-pdf-quatation.component.css'],
})
export class VPdfQuotationComponent implements OnInit {
  isPopupVisible: boolean = false;
  productArray: any;
  isfadeOutDown = false;
  ispdfview = false;
  _allQuoDetails: any;

  @Input() quoId: any;
  @Output() close = new EventEmitter<boolean>();
  @ViewChild('content') content!: ElementRef;

  constructor(private quoService: QuotationService) {}

  ngOnInit(): void {
    console.log('QuotationId', this.quoId);
    this.viewPdf();
  }

  downloadQuotation(): void {
    const element = this.content.nativeElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF.jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('quotation.pdf');
    });
  }

  hidePopup() {
    this.isfadeOutDown = true;
    setTimeout(() => {
      this.isPopupVisible = false;
      this.isfadeOutDown = false;
    }, 500);
  }

  closePdfView() {
    this.close.emit(false);
  }

  viewPdf() {
    this.quoService.getAllMasters(this.quoId).subscribe((res) => {
      console.log(res);
      this._allQuoDetails = res;
    });
  }

  makePdf(): void {
    console.log('PDF generation triggered');
    const doc = new jsPDF.jsPDF();

    this.loadImage('assets/img/cloude (1).svg').then((base64Image: string) => {
      doc.addImage(base64Image, 'SVG', 10, 10, 30, 0);

      autoTable(doc, {
        startY: 40,
        body: [
          [
            {
              content: 'QUOTATION\nOriginal for Recipient',
              styles: {
                halign: 'left',
                fontSize: 16,
                fontStyle: 'bold',
                textColor: '#0000FF',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'GSTIN:\tPAN:',
              styles: {
                halign: 'left',
              },
            },

            {
              content: 'Quotation #: EST202425-01\nQuotation Date: 2024-06-06',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: '\nMobile:\tEmail:',
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: '\nWebsite:',
              styles: {
                halign: 'left',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        body: [
          [
            {
              content:
                'Customer Details:\nsherin\nsherin\n\nGSTIN:\nPh: 9836748904\n\nPlace of Supply: dholakpur',
              styles: {
                halign: 'left',
                cellWidth: 'auto',
              },
            },
            {
              content:
                'Billing Address:\n20-kr, mahaleswar\ndam\nlonden\ndholakpur\n636406',
              styles: {
                halign: 'left',
                cellWidth: 'auto',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'Reference: wertyuio',
              styles: {
                halign: 'right',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        head: [
          [
            '#',
            'Item',
            'Rate / Item',
            'Qty',
            'Taxable Value',
            'Tax Amount',
            'Amount',
          ],
        ],
        body: [
          [
            '1',
            'fgsr43gtazsdrfgthj',
            '200000',
            '3',
            '24,500.00',
            '10000 (5%)',
            '28,910.00',
          ],
          [
            '2',
            'CRUCIAL 2.5 INCH SATA SSD 512GB',
            '2,650.00',
            '7',
            '18,550.00',
            '3,339.00 (18%)',
            '21,889.00',
          ],
          [
            '3',
            'WD 2.5 inch Sata SSD 512GB',
            '3,625.00',
            '7',
            '25,375.00',
            '4,567.50 (18%)',
            '29,942.50',
          ],
        ],
        theme: 'striped',
        headStyles: {
          fillColor: '#0000FF',
          textColor: '#ffffff',
        },
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'Taxable Amount',
              styles: {
                halign: 'right',
              },
            },
            {
              content: '8,08,200.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'CGST 9%',
              styles: {
                halign: 'right',
              },
            },
            {
              content: '72,738.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'SGST 9%',
              styles: {
                halign: 'right',
              },
            },
            {
              content: '72,738.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'IGST 18.0%',
              styles: {
                halign: 'right',
              },
            },
            {
              content: '1,45,476.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'Total',
              styles: {
                halign: 'right',
              },
            },
            {
              content: '9,53,676.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'Total Amount (in words)',
              styles: {
                halign: 'right',
              },
            },
            {
              content:
                'INR Nine Lakh, Fifty-Three Thousand, Six Hundred And Seventy-Six Rupees Only.',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'Amount Payable',
              styles: {
                halign: 'right',
              },
            },
            {
              content: '9,53,676.00',
              styles: {
                halign: 'right',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      doc.addPage();

      autoTable(doc, {
        body: [
          [
            {
              content: 'Bank Details:',
              styles: {
                halign: 'left',
                fontSize: 14,
                fontStyle: 'bold',
              },
            },
          ],
          [
            {
              content:
                'Bank: HDFC Bank\nAccount #: 12345678909\nIFSC: HDFC0000035\nBranch: CHANDIGARH - SECTOR THIRTY FIVE B',
              styles: {
                halign: 'left',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'Terms and Conditions:',
              styles: {
                halign: 'left',
                fontSize: 14,
                fontStyle: 'bold',
              },
            },
          ],
          [
            {
              content:
                '1. Tax : GST 18% Included in the above Price.\n2. Warranty : Company Direct\n3. Validity : Till 20th of June 2024\n4. Delivery : Same Day from PO\n5. Payment : 50% Advance along with PO Balance on Delivery',
              styles: {
                halign: 'left',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        body: [
          [
            {
              content: '',
              styles: {
                halign: 'left',
              },
            },
            {
              content: 'FOR Cloudefi Technologies Pvt. Ltd.',
              styles: {
                halign: 'right',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'Authorised Signatory',
              styles: {
                halign: 'right',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      doc.save('quotation.pdf');
    });
  }

  loadImage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/svg+xml'));
        } else {
          reject(new Error('Canvas context is null'));
        }
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  }
}
