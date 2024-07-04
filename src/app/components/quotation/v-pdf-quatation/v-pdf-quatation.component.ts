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
      this._allQuoDetails = res || {};
    });
  }

  makePdf(): void {
    console.log('PDF generation triggered');
    const doc = new jsPDF.jsPDF();
    const quotationDetails = this._allQuoDetails;
    console.log(quotationDetails);

    this.loadImage(this.previewUrl).then((base64Image: string) => {
      doc.addImage(base64Image, 'SVG', 10, 10, 50, 0);

      autoTable(doc, {
        startY: 40,
        body: [
          [
            {
              content: `QUOTATION\n ${quotationDetails.companyDto.comName}`,
              styles: {
                halign: 'left',
                fontSize: 16,
                fontStyle: 'bold',
                textColor: '#0000FF',
              },
            },
            {
              content: `Quotation #:2024-25/${quotationDetails.quoAutoId}\nQuotation Date: ${quotationDetails.quoDate}`,
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
              content: `GSTIN: ${quotationDetails.companyDto.comGst}`,
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: `PAN:${quotationDetails.companyDto.comPan}`,
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: `\n\n\nMobile: ${quotationDetails.companyDto.comConPhone},${quotationDetails.companyDto.comLandLine}`,
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: `Email: ${quotationDetails.companyDto.comEmail}`,
              styles: {
                halign: 'left',
              },
            },
          ],
          [
            {
              content: `Website: ${quotationDetails.companyDto.comUrl}`,
              styles: {
                halign: 'left',
              },
            },
          ],
        ],
        theme: 'plain',
        didDrawCell: (data) => {
          if (data.row.index === 4) {
            doc.setDrawColor(192, 192, 192); // Gray color
            doc.setLineWidth(0.5); // Line width
            doc.line(
              data.cell.x,
              data.cell.y + data.cell.height,
              data.cell.x + data.cell.width,
              data.cell.y + data.cell.height,
            );
          }
        },
      });

      autoTable(doc, {
        body: [
          [
            {
              content: `Customer Details:\n Customer Name:${quotationDetails.customerDto.cusName} \nContact Person Name:  ${quotationDetails.customerDto.cusConPerson}\n Phone:${quotationDetails.customerDto.cusConPhone}
              \n GSTIn:${quotationDetails.customerDto.cusGst} \nplace of supply:${quotationDetails.customerDto.cusBState}`,
              styles: {
                halign: 'left',
                cellWidth: 'auto',
              },
            },
            {
              content: `Shipping Address:\n${quotationDetails.customerDto.cusSAdd1}\n ${quotationDetails.customerDto.cusSAdd2}\n ${quotationDetails.customerDto.cusSCity}\n ${quotationDetails.customerDto.cusSState}-${quotationDetails.customerDto.cusSPcode}`,
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
              content: `Reference: ${quotationDetails.quoReference}`,
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
        body: this._allQuoDetails.getAllProductDTO.map((product: any) => [
          `${product.prdId}`,
          `${product.prdModel}`,
          `${product.unitPrice}`,
          `${product.quantity}`,
          `${product.taxable}`,
          `${product.prdGstPercent}%\n${product.gstAmt}`,
          `${product.includedtaxAmt}`,
        ]),
        theme: 'grid',
        headStyles: {
          textColor: [0, 0, 0], // Black text color
          fillColor: [255, 255, 255], // White fill color for header
          lineWidth: 0, // No border for header
          lineColor: [0, 0, 0], // Black line color (won't be visible without borders)
        },
        bodyStyles: {
          lineWidth: 0, // No border for body rows
          lineColor: [0, 128, 0], // Green line color
        },

        styles: {
          fillColor: false, // Disable default fill color for the entire table
        },
      });

      autoTable(doc, {
        body: [
          [
            {
              content: `\n Taxable:${quotationDetails.taxableTotal}`,
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: `CGST: ${quotationDetails.cgstTotal}`,
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: `SGST:${quotationDetails.sgstTotal}`,
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: `IGST:${quotationDetails.igstTotal}`,
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: `Delivery :${quotationDetails.othersCharge.delCharge}`,
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: `Install:${quotationDetails.othersCharge.instllCharge}`,
              styles: {
                halign: 'right',
              },
            },
          ],
          [
            {
              content: `\n TOTAL:${quotationDetails.total}`,
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
              content: `\n Amount Payable:${quotationDetails.total}`,
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
              content: `\n BankName:${quotationDetails.bankEntityDto.bankName}\n Account No:${quotationDetails.bankEntityDto.accountNo}\nIFSC Code:${quotationDetails.bankEntityDto.ifscCode}\nBranch:${quotationDetails.bankEntityDto.branchName}`,
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
              content: this._allQuoDetails.quoTeamCondition.map((term: any) => [
                ` \n${term.termConditn}`,
              ]),

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
