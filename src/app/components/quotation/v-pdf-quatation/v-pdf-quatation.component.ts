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
import { CompanyService } from '../../../services/company.service';

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
  previewUrl: string = '';
  imageData: any;
  signatureData: any;
  signatureUrl: string = '';

  constructor(
    private quoService: QuotationService,
    private comser: CompanyService,
  ) {}

  ngOnInit(): void {
    console.log('QuotationId', this.quoId);
    this.viewPdf();
    this.retrieveComLogo();
    this.retrieveSignature();
  }

  retrieveSignature() {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      this.comser.getSignature(comId).subscribe(
        (res: any) => {
          console.log(res);
          this.signatureData = res.comSignature;
          this.signatureUrl = 'data:image/jpeg;base64,' + this.signatureData;
        },
        (error: any) => {
          console.error('Error fetching signature:', error);
        },
      );
    } else {
      console.error('Company ID not found in session storage');
    }
  }

  retrieveComLogo() {
    const comId = sessionStorage.getItem('companyId');
    if (comId) {
      this.comser.getCompanyLogo(comId).subscribe(
        (res: any) => {
          console.log(res);
          this.imageData = res.comLogo;
          this.previewUrl = 'data:image/jpeg;base64,' + this.imageData;
        },
        (error: any) => {
          console.error('Error fetching company logo:', error);
        },
      );
    } else {
      console.error('Company ID not found in session storage');
    }
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
      doc.addImage(base64Image, 'SVG', 10, 10, 50, 0);

      autoTable(doc, {
        startY: 40,
        body: [
          [
            {
              content: 'QUOTATION\nCLOUTE TECHNOLOGIES PRIVATE LIMITED',
              styles: {
                halign: 'left',
                fontSize: 16,
                fontStyle: 'bold',
                textColor: '#0000FF',
              },
            },
            {
              content: 'Quotation #: EST202425-01\nQuotation Date: 2024-06-06',
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
              content: 'GSTIN:',
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: 'PAN:',
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: '\n\n\nMobile:',
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: 'Email:',
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: 'Website:',
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
        theme: 'grid',
        headStyles: {
          textColor: '#000000', // Set text color to black
          fillColor: [255, 255, 255], // Set fill color to white (or remove this line if you don't want any fill color)
          lineWidth: 0, // Remove border line
          lineColor: [0, 0, 0], // Set line color to black (this line won't affect the border as lineWidth is 0)
        },
        bodyStyles: {
          lineWidth: 0, // Remove border line
          lineColor: [0, 0, 0], // Set line color to black (this line won't affect the border as lineWidth is 0)
        },
        styles: {
          fillColor: false, // Disable the default fill color for the entire table
        },
      });

      autoTable(doc, {
        body: [
          [
            {
              content: 'Taxable Amount:\t8,08,200.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'CGST 9%:\t72,738.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'SGST 9%:\t72,738.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'IGST 18.0%:\t1,45,476.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'Total:\t9,53,676.00',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content:
                'Total Amount (in words):\tINR Nine Lakh, Fifty-Three Thousand, Six Hundred And Seventy-Six Rupees Only.',
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: 'Amount Payable:\t9,53,676.00',
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
                'Bank: ICICI Bank\nA/C No: 123456789012\nIFSC: ICIC0001234\nBranch: Chennai',
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
                'Terms and Conditions:\n1. All disputes are subject to Chennai jurisdiction only.\n2. Goods once sold will not be taken back or exchanged.',
              styles: {
                halign: 'left',
                fontSize: 12,
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
              content: 'FOR Cloute Technologies Pvt. Ltd.',
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
              content: '\n\n\n\nAuthorized Signatory',
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
    // this.makechallan(); //used to download multiple pdf
  }

  loadImage(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx!.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }
}
