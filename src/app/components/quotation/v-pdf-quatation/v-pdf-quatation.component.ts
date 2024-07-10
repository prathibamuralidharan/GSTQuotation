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
import { NgFor } from '@angular/common';
import 'jspdf-autotable';

import 'jspdf-autotable';

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
  a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen ',
  ];
  b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

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
      this._allQuoDetails = res || {};
    });
  }
  formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  makePdf(): void {
    console.log('PDF generation triggered');
    const doc = new jsPDF.jsPDF({ compress: true });
    const quotationDetails = this._allQuoDetails;

    console.log(quotationDetails);

    this.loadImage(this.previewUrl).then((base64Image: string) => {
      doc.addImage(base64Image, 'PNG', 15, 10, 30, 0);

      autoTable(doc, {
        body: [
          [
            {
              content: `Quotation #: 202425-${quotationDetails.quoAutoId}\n$Quotation Date: ${this.formatDate(quotationDetails.quoDate)}`,
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
              content: `QUOTATION`,
              styles: {
                halign: 'left',
                fontSize: 10,
                fontStyle: 'normal',
                textColor: '#0000FF',
              },
            },
          ],
          [
            {
              content: `${quotationDetails.companyDto.comName}`,
              styles: {
                halign: 'left',
                fontSize: 14,
                fontStyle: 'bold',
                textColor: '#0000FF',
              },
            },
          ],
          [
            {
              content: `GSTIN: ${quotationDetails.companyDto.comGst}  PAN: ${quotationDetails.companyDto.comPan}`,
              styles: {
                halign: 'left',
                fontStyle: 'bold',
              },
            },
          ],
          [
            {
              content: `${quotationDetails.companyAddressDto.comBAdd1},\n${quotationDetails.companyAddressDto.comBAdd2},${quotationDetails.companyAddressDto.comBCity}-${quotationDetails.companyAddressDto.comBPcode}\n${quotationDetails.companyAddressDto.comBState}.\nMobile: ${quotationDetails.companyDto.comConPhone}, Email: ${quotationDetails.companyDto.comEmail}\nWebsite: ${quotationDetails.companyDto.comUrl}`,
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
              content: `Customer Details:\n\n${quotationDetails.customerDto.cusName}\n${quotationDetails.customerDto.cusConPerson}\n${quotationDetails.customerDto.cusConPhone}\nGSTIn:${quotationDetails.customerDto.cusGst}\nplace of supply:${quotationDetails.customerDto.cusBState}`,
              styles: {
                halign: 'left',
              },
            },
            {
              content: `Billing Address:\n\n${quotationDetails.customerDto.cusBAdd1}\n${quotationDetails.customerDto.cusBAdd2}\n${quotationDetails.customerDto.cusBCity}--${quotationDetails.customerDto.cusBPcode}\n${quotationDetails.customerDto.cusBState}.`,
              styles: {
                halign: 'left',
              },
            },
            {
              content: `Shipping Address:\n\n${quotationDetails.customerDto.cusSAdd1}\n${quotationDetails.customerDto.cusSAdd2}\n${quotationDetails.customerDto.cusSCity}--${quotationDetails.customerDto.cusSPcode}\n${quotationDetails.customerDto.cusSState}\nReference:${quotationDetails.quoReference}`,
              styles: {
                halign: 'left',
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
        body: this._allQuoDetails.getAllProductDTO.map(
          (product: any, index: number) => [
            `${index + 1}`,
            `${product.prdModel}`,
            `${Number(product.unitPrice).toFixed(2)}`,
            `${product.quantity}`,
            `${Number(product.taxable).toFixed(2)}`,
            `${product.prdGstPercent}%\n${product.gstAmt}`,
            `${product.includedtaxAmt}`,
          ],
        ),
        theme: 'grid',
      });

      autoTable(doc, {
        body: [
          [
            {
              content: `Bank Details:\n\nBank Name:${quotationDetails.bankEntityDto.bankName}\nAccount No:${quotationDetails.bankEntityDto.accountNo}\nIFSC Code:${quotationDetails.bankEntityDto.ifscCode}\nBranch Name:${quotationDetails.bankEntityDto.branchName}`,
              styles: {
                halign: 'left',
              },
            },
            {
              content: `Taxable Amount:${Number(quotationDetails.taxableTotal).toFixed(2)}\nCGST:${Number(quotationDetails.cgstTotal).toFixed(2)}\nSGST: ${Number(quotationDetails.sgstTotal).toFixed(2)}\nIGST: ${Number(quotationDetails.igstTotal).toFixed(2)}\nTOTAL: ${Number(quotationDetails.total).toFixed(2)}`,
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
              content: `Total Amount(in words): INR: ${this.convertNumberToWords(quotationDetails.total)} Rupees Only`,
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: `Amount Payable:${quotationDetails.total.toFixed(2)}`,
              styles: {
                halign: 'right',
              },
            },
          ],
        ],
        theme: 'plain',
      });

      autoTable(doc, {
        head: [['Terms and Condition:']],
        body: this._allQuoDetails.quoTeamCondition.map((terms: any) => [
          `${terms.termConditn}`,
        ]),

        theme: 'plain',
      });
      autoTable(doc, {
        body: [
          [
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
      const finalY = (doc as any).lastAutoTable.finalY || 10;
      this.loadImage(this.signatureUrl)
        .then((signatureImage: string) => {
          doc.addImage(signatureImage, 'PNG', 150, finalY, 50, 0);

          autoTable(doc, {
            body: [
              [
                {
                  content: 'Authorized Signatory',
                  styles: {
                    halign: 'right',
                  },
                },
              ],
            ],
            theme: 'plain',
            startY: finalY + 22,
          });

          doc.save('quotation.pdf');
        })
        .catch((error) => {
          console.error('Error loading signature image:', error);
          doc.save('quotation.pdf'); // Save PDF even if signature image fails to load
        });
    });
  }
  convertNumberToWords(amount: number): string {
    const a = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const b = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];

    if (amount === 0) return 'zero';

    const inWords = (num: number): string => {
      if (num < 20) return a[num];
      if (num < 100)
        return b[Math.floor(num / 10)] + (num % 10 ? ' ' + a[num % 10] : '');
      if (num < 1000)
        return (
          a[Math.floor(num / 100)] +
          ' hundred' +
          (num % 100 ? ' ' + inWords(num % 100) : '')
        );
      if (num < 100000)
        return (
          inWords(Math.floor(num / 1000)) +
          ' thousand' +
          (num % 1000 ? ' ' + inWords(num % 1000) : '')
        );
      if (num < 10000000)
        return (
          inWords(Math.floor(num / 100000)) +
          ' lakh' +
          (num % 100000 ? ' ' + inWords(num % 100000) : '')
        );
      return (
        inWords(Math.floor(num / 10000000)) +
        ' crore' +
        (num % 10000000 ? ' ' + inWords(num % 10000000) : '')
      );
    };

    return inWords(amount).trim();
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
